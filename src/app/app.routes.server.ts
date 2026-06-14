import { RenderMode, ServerRoute } from '@angular/ssr';
import { BLOG_ARTICLE_SLUGS } from './data/blog-articles-meta';

export const serverRoutes: ServerRoute[] = [
  { path: '', renderMode: RenderMode.Prerender },
  { path: 'lancamentos', renderMode: RenderMode.Prerender },
  { path: 'blog', renderMode: RenderMode.Prerender },
  { path: 'onde-comprar', renderMode: RenderMode.Prerender },
  { path: 'contato', renderMode: RenderMode.Prerender },
  { path: 'politica-de-privacidade', renderMode: RenderMode.Prerender },
  { path: 'termos-de-uso', renderMode: RenderMode.Prerender },
  {
    path: 'blog/:slug',
    renderMode: RenderMode.Prerender,
    async getPrerenderParams() {
      return BLOG_ARTICLE_SLUGS.map((slug) => ({ slug }));
    },
  },
  { path: '**', renderMode: RenderMode.Client },
];
