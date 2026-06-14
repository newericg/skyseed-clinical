import type { Env } from '../env';
import { uuid } from '../lib/crypto';
import { error, json, readJson } from '../lib/http';
import { requireAuth } from './auth';

export interface ArticleSection {
  heading?: string;
  paragraphs: string[];
}

export interface ArticleSections {
  pt: ArticleSection[];
  en: ArticleSection[];
}

export interface ArticleRow {
  id: string;
  slug: string;
  status: 'draft' | 'published';
  title_pt: string;
  title_en: string;
  excerpt_pt: string;
  excerpt_en: string;
  meta_description_pt: string;
  meta_description_en: string;
  published_at: string | null;
  cover_web: string | null;
  cover_mobile: string | null;
  cover_alt_pt: string | null;
  cover_alt_en: string | null;
  sections_json: string;
  created_at: string;
  updated_at: string;
  published_by: string | null;
}

export interface ArticlePayload {
  slug?: string;
  titlePt?: string;
  titleEn?: string;
  excerptPt?: string;
  excerptEn?: string;
  metaDescriptionPt?: string;
  metaDescriptionEn?: string;
  publishedAt?: string | null;
  coverWeb?: string | null;
  coverMobile?: string | null;
  coverAltPt?: string | null;
  coverAltEn?: string | null;
  sections?: ArticleSections;
}

function mapArticle(row: ArticleRow) {
  return {
    id: row.id,
    slug: row.slug,
    status: row.status,
    title: { pt: row.title_pt, en: row.title_en },
    excerpt: { pt: row.excerpt_pt, en: row.excerpt_en },
    metaDescription: { pt: row.meta_description_pt, en: row.meta_description_en },
    publishedAt: row.published_at,
    coverImage: {
      web: row.cover_web ?? '',
      mobile: row.cover_mobile ?? '',
      alt: { pt: row.cover_alt_pt ?? '', en: row.cover_alt_en ?? '' },
    },
    sections: JSON.parse(row.sections_json) as ArticleSections,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    publishedBy: row.published_by,
  };
}

function validatePayload(body: ArticlePayload): string | null {
  if (!body.slug?.trim()) return 'Slug é obrigatório.';
  if (!body.titlePt?.trim() || !body.titleEn?.trim()) return 'Título PT e EN são obrigatórios.';
  if (!body.excerptPt?.trim() || !body.excerptEn?.trim()) return 'Resumo PT e EN são obrigatórios.';
  if (!body.metaDescriptionPt?.trim() || !body.metaDescriptionEn?.trim()) {
    return 'Meta description PT e EN são obrigatórias.';
  }
  return null;
}

async function listArticles(env: Env, status?: 'draft' | 'published') {
  const query = status
    ? 'SELECT * FROM articles WHERE status = ? ORDER BY updated_at DESC'
    : 'SELECT * FROM articles ORDER BY updated_at DESC';
  const stmt = env.DB.prepare(query);
  const result = status ? await stmt.bind(status).all<ArticleRow>() : await stmt.all<ArticleRow>();
  return (result.results ?? []).map(mapArticle);
}

export async function handleArticles(
  env: Env,
  request: Request,
  path: string,
): Promise<Response | null> {
  if (path === '/api/articles/published' && request.method === 'GET') {
    const buildKey = request.headers.get('x-build-key');
    if (!env.BUILD_API_KEY || buildKey !== env.BUILD_API_KEY) {
      return error('Não autorizado.', 401);
    }
    const articles = await listArticles(env, 'published');
    return json({ articles });
  }

  if (path === '/api/articles' && request.method === 'GET') {
    const auth = await requireAuth(env, request);
    if (auth instanceof Response) return auth;
    const articles = await listArticles(env);
    return json({ articles });
  }

  if (path === '/api/articles' && request.method === 'POST') {
    const auth = await requireAuth(env, request);
    if (auth instanceof Response) return auth;

    const body = await readJson<ArticlePayload>(request);
    const validation = validatePayload(body);
    if (validation) return error(validation);

    const now = new Date().toISOString();
    const id = uuid();
    const sections = JSON.stringify(body.sections ?? { pt: [], en: [] });

    try {
      await env.DB.prepare(
        `INSERT INTO articles (
          id, slug, status, title_pt, title_en, excerpt_pt, excerpt_en,
          meta_description_pt, meta_description_en, published_at,
          cover_web, cover_mobile, cover_alt_pt, cover_alt_en,
          sections_json, created_at, updated_at
        ) VALUES (?, ?, 'draft', ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      )
        .bind(
          id,
          body.slug!.trim(),
          body.titlePt!.trim(),
          body.titleEn!.trim(),
          body.excerptPt!.trim(),
          body.excerptEn!.trim(),
          body.metaDescriptionPt!.trim(),
          body.metaDescriptionEn!.trim(),
          body.publishedAt ?? null,
          body.coverWeb ?? null,
          body.coverMobile ?? null,
          body.coverAltPt ?? null,
          body.coverAltEn ?? null,
          sections,
          now,
          now,
        )
        .run();
    } catch {
      return error('Slug já existe ou dados inválidos.', 409);
    }

    const row = await env.DB.prepare('SELECT * FROM articles WHERE id = ?')
      .bind(id)
      .first<ArticleRow>();
    return json({ article: row ? mapArticle(row) : null }, 201);
  }

  const articleMatch = path.match(/^\/api\/articles\/([^/]+)(?:\/(publish))?$/);
  if (!articleMatch) return null;

  const [, id, action] = articleMatch;

  if (action === 'publish' && request.method === 'POST') {
    const auth = await requireAuth(env, request);
    if (auth instanceof Response) return auth;

    const now = new Date().toISOString();
    await env.DB.prepare(
      `UPDATE articles SET status = 'published', published_at = COALESCE(published_at, ?),
       updated_at = ?, published_by = ? WHERE id = ?`,
    )
      .bind(now, now, auth.email, id)
      .run();

    const row = await env.DB.prepare('SELECT * FROM articles WHERE id = ?')
      .bind(id)
      .first<ArticleRow>();
    if (!row) return error('Artigo não encontrado.', 404);
    return json({ article: mapArticle(row) });
  }

  if (request.method === 'GET') {
    const auth = await requireAuth(env, request);
    if (auth instanceof Response) return auth;

    const row = await env.DB.prepare('SELECT * FROM articles WHERE id = ?')
      .bind(id)
      .first<ArticleRow>();
    if (!row) return error('Artigo não encontrado.', 404);
    return json({ article: mapArticle(row) });
  }

  if (request.method === 'PUT') {
    const auth = await requireAuth(env, request);
    if (auth instanceof Response) return auth;

    const body = await readJson<ArticlePayload>(request);
    const validation = validatePayload(body);
    if (validation) return error(validation);

    const now = new Date().toISOString();
    const sections = JSON.stringify(body.sections ?? { pt: [], en: [] });

    try {
      await env.DB.prepare(
        `UPDATE articles SET
          slug = ?, title_pt = ?, title_en = ?, excerpt_pt = ?, excerpt_en = ?,
          meta_description_pt = ?, meta_description_en = ?, published_at = ?,
          cover_web = ?, cover_mobile = ?, cover_alt_pt = ?, cover_alt_en = ?,
          sections_json = ?, updated_at = ?
         WHERE id = ?`,
      )
        .bind(
          body.slug!.trim(),
          body.titlePt!.trim(),
          body.titleEn!.trim(),
          body.excerptPt!.trim(),
          body.excerptEn!.trim(),
          body.metaDescriptionPt!.trim(),
          body.metaDescriptionEn!.trim(),
          body.publishedAt ?? null,
          body.coverWeb ?? null,
          body.coverMobile ?? null,
          body.coverAltPt ?? null,
          body.coverAltEn ?? null,
          sections,
          now,
          id,
        )
        .run();
    } catch {
      return error('Slug já existe ou dados inválidos.', 409);
    }

    const row = await env.DB.prepare('SELECT * FROM articles WHERE id = ?')
      .bind(id)
      .first<ArticleRow>();
    if (!row) return error('Artigo não encontrado.', 404);
    return json({ article: mapArticle(row) });
  }

  if (request.method === 'DELETE') {
    const auth = await requireAuth(env, request);
    if (auth instanceof Response) return auth;

    await env.DB.prepare('DELETE FROM articles WHERE id = ?').bind(id).run();
    return json({ ok: true });
  }

  return null;
}
