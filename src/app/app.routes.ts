import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home').then((m) => m.HomeComponent),
  },
  {
    path: 'lancamentos',
    loadComponent: () =>
      import('./pages/lancamentos/lancamentos').then((m) => m.LancamentosComponent),
  },
  {
    path: 'blog',
    loadComponent: () =>
      import('./pages/blog/blog-list/blog-list').then((m) => m.BlogListComponent),
  },
  {
    path: 'blog/:slug',
    loadComponent: () =>
      import('./pages/blog/article/article').then((m) => m.ArticleComponent),
  },
  {
    path: 'onde-comprar',
    loadComponent: () =>
      import('./pages/onde-comprar/onde-comprar').then((m) => m.OndeComprarComponent),
  },
  {
    path: 'contato',
    loadComponent: () => import('./pages/contato/contato').then((m) => m.ContatoComponent),
  },
  {
    path: 'politica-de-privacidade',
    loadComponent: () =>
      import('./pages/politica-privacidade/politica-privacidade').then(
        (m) => m.PoliticaPrivacidadeComponent,
      ),
  },
  {
    path: 'termos-de-uso',
    loadComponent: () =>
      import('./pages/termos-de-uso/termos-de-uso').then((m) => m.TermosDeUsoComponent),
  },
  {
    path: '**',
    loadComponent: () => import('./pages/not-found/not-found').then((m) => m.NotFoundComponent),
  },
];
