import { Routes } from '@angular/router';
import { adminAuthGuard, adminGuestGuard } from './guards/admin-auth.guard';

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
    path: 'admin/login',
    canActivate: [adminGuestGuard],
    loadComponent: () =>
      import('./pages/admin/admin-login/admin-login').then((m) => m.AdminLoginComponent),
  },
  {
    path: 'admin',
    canActivate: [adminAuthGuard],
    loadComponent: () =>
      import('./pages/admin/admin-layout/admin-layout').then((m) => m.AdminLayoutComponent),
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
      {
        path: 'dashboard',
        data: { adminTitle: 'Dashboard' },
        loadComponent: () =>
          import('./pages/admin/admin-dashboard/admin-dashboard').then(
            (m) => m.AdminDashboardComponent,
          ),
      },
      {
        path: 'articles',
        data: { adminTitle: 'Artigos' },
        loadComponent: () =>
          import('./pages/admin/admin-articles/admin-articles').then((m) => m.AdminArticlesComponent),
      },
      {
        path: 'articles/new',
        data: { adminTitle: 'Novo artigo' },
        loadComponent: () =>
          import('./pages/admin/admin-article-editor/admin-article-editor').then(
            (m) => m.AdminArticleEditorComponent,
          ),
      },
      {
        path: 'articles/:id/edit',
        data: { adminTitle: 'Editar artigo' },
        loadComponent: () =>
          import('./pages/admin/admin-article-editor/admin-article-editor').then(
            (m) => m.AdminArticleEditorComponent,
          ),
      },
      {
        path: 'users',
        data: { adminTitle: 'Usuários' },
        loadComponent: () =>
          import('./pages/admin/admin-users/admin-users').then((m) => m.AdminUsersComponent),
      },
    ],
  },
  {
    path: '**',
    loadComponent: () => import('./pages/not-found/not-found').then((m) => m.NotFoundComponent),
  },
];
