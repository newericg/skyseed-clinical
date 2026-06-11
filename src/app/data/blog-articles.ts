import { Lang } from '../services/language.service';
import { ARTICLE_SECTIONS, BlogSection } from './blog-articles-content';
import {
  BLOG_ARTICLES_META,
  BLOG_ARTICLE_SLUGS,
  BLOG_PAGE_SIZE,
  BlogArticleMeta,
  BlogCoverImage,
  getArticleMetaBySlug,
} from './blog-articles-meta';

export type { BlogSection, BlogCoverImage, BlogArticleMeta };
export { BLOG_ARTICLES_META, BLOG_ARTICLE_SLUGS, BLOG_PAGE_SIZE, getArticleMetaBySlug };

export interface BlogArticle extends BlogArticleMeta {
  sections: Record<Lang, BlogSection[]>;
}

export const BLOG_ARTICLES: BlogArticle[] = BLOG_ARTICLES_META.map((meta) => ({
  ...meta,
  sections: ARTICLE_SECTIONS[meta.slug],
}));

export function getArticleBySlug(slug: string): BlogArticle | undefined {
  const meta = getArticleMetaBySlug(slug);
  if (!meta) return undefined;
  const sections = ARTICLE_SECTIONS[slug];
  if (!sections) return undefined;
  return { ...meta, sections };
}
