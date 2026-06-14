import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from '../../environments/environment';
import { BlogSection } from '../data/blog-articles-content';

export interface AdminArticle {
  id: string;
  slug: string;
  status: 'draft' | 'published';
  title: { pt: string; en: string };
  excerpt: { pt: string; en: string };
  metaDescription: { pt: string; en: string };
  publishedAt: string | null;
  coverImage: {
    web: string;
    mobile: string;
    alt: { pt: string; en: string };
  };
  sections: { pt: BlogSection[]; en: BlogSection[] };
  createdAt: string;
  updatedAt: string;
  publishedBy: string | null;
}

export interface ArticleInput {
  slug: string;
  titlePt: string;
  titleEn: string;
  excerptPt: string;
  excerptEn: string;
  metaDescriptionPt: string;
  metaDescriptionEn: string;
  publishedAt?: string | null;
  coverWeb?: string | null;
  coverMobile?: string | null;
  coverAltPt?: string | null;
  coverAltEn?: string | null;
  sections: { pt: BlogSection[]; en: BlogSection[] };
}

@Injectable({ providedIn: 'root' })
export class AdminArticlesService {
  private http = inject(HttpClient);
  private readonly base = `${environment.apiUrl}/api/articles`;

  list(): Observable<AdminArticle[]> {
    return this.http
      .get<{ articles: AdminArticle[] }>(this.base, { withCredentials: true })
      .pipe(map((res) => res.articles));
  }

  get(id: string): Observable<AdminArticle> {
    return this.http
      .get<{ article: AdminArticle }>(`${this.base}/${id}`, { withCredentials: true })
      .pipe(map((res) => res.article));
  }

  create(input: ArticleInput): Observable<AdminArticle> {
    return this.http
      .post<{ article: AdminArticle }>(this.base, input, { withCredentials: true })
      .pipe(map((res) => res.article));
  }

  update(id: string, input: ArticleInput): Observable<AdminArticle> {
    return this.http
      .put<{ article: AdminArticle }>(`${this.base}/${id}`, input, { withCredentials: true })
      .pipe(map((res) => res.article));
  }

  publish(id: string): Observable<AdminArticle> {
    return this.http
      .post<{ article: AdminArticle }>(`${this.base}/${id}/publish`, {}, { withCredentials: true })
      .pipe(map((res) => res.article));
  }

  delete(id: string): Observable<void> {
    return this.http
      .delete<{ ok: boolean }>(`${this.base}/${id}`, { withCredentials: true })
      .pipe(map(() => void 0));
  }
}
