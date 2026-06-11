import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home';
import { BlogListComponent } from './pages/blog/blog-list/blog-list';
import { ArticleComponent } from './pages/blog/article/article';
import { LancamentosComponent } from './pages/lancamentos/lancamentos';
import { OndeComprarComponent } from './pages/onde-comprar/onde-comprar';
import { ContatoComponent } from './pages/contato/contato';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'lancamentos', component: LancamentosComponent },
  { path: 'blog', component: BlogListComponent },
  { path: 'blog/:slug', component: ArticleComponent },
  { path: 'onde-comprar', component: OndeComprarComponent },
  { path: 'contato', component: ContatoComponent },
];
