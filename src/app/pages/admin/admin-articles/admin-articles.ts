import { DatePipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AdminArticle, AdminArticlesService } from '../../../services/admin-articles.service';

@Component({
  selector: 'app-admin-articles',
  imports: [RouterLink, DatePipe],
  templateUrl: './admin-articles.html',
  styleUrl: './admin-articles.scss',
})
export class AdminArticlesComponent {
  private articlesService = inject(AdminArticlesService);

  readonly articles = signal<AdminArticle[]>([]);
  readonly loading = signal(true);
  readonly error = signal('');

  constructor() {
    this.load();
  }

  load(): void {
    this.loading.set(true);
    this.articlesService.list().subscribe({
      next: (articles) => {
        this.articles.set(articles);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Não foi possível carregar os artigos.');
        this.loading.set(false);
      },
    });
  }

  publish(id: string): void {
    this.articlesService.publish(id).subscribe({
      next: () => this.load(),
      error: () => this.error.set('Falha ao publicar o artigo.'),
    });
  }

  remove(id: string): void {
    if (!confirm('Excluir este artigo?')) return;
    this.articlesService.delete(id).subscribe({
      next: () => this.load(),
      error: () => this.error.set('Falha ao excluir o artigo.'),
    });
  }
}
