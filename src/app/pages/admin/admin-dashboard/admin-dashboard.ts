import { DatePipe } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { forkJoin } from 'rxjs';
import { AdminArticle, AdminArticlesService } from '../../../services/admin-articles.service';
import { AdminUsersService } from '../../../services/admin-users.service';

@Component({
  selector: 'app-admin-dashboard',
  imports: [RouterLink, DatePipe],
  templateUrl: './admin-dashboard.html',
  styleUrl: './admin-dashboard.scss',
})
export class AdminDashboardComponent {
  private articlesService = inject(AdminArticlesService);
  private usersService = inject(AdminUsersService);

  readonly articles = signal<AdminArticle[]>([]);
  readonly usersCount = signal(0);
  readonly loading = signal(true);
  readonly error = signal('');

  readonly publishedCount = computed(
    () => this.articles().filter((article) => article.status === 'published').length,
  );

  readonly draftCount = computed(
    () => this.articles().filter((article) => article.status === 'draft').length,
  );

  readonly recentArticles = computed(() =>
    [...this.articles()]
      .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
      .slice(0, 5),
  );

  constructor() {
    forkJoin({
      articles: this.articlesService.list(),
      users: this.usersService.list(),
    }).subscribe({
      next: ({ articles, users }) => {
        this.articles.set(articles);
        this.usersCount.set(users.length);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Não foi possível carregar os dados do painel.');
        this.loading.set(false);
      },
    });
  }
}
