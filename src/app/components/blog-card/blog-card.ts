import { Component, Input, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BlogArticleMeta } from '../../data/blog-articles-meta';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-blog-card',
  imports: [RouterLink],
  templateUrl: './blog-card.html',
  styleUrl: './blog-card.scss',
})
export class BlogCardComponent {
  @Input({ required: true }) article!: BlogArticleMeta;
  @Input() index?: number;
  @Input() readLabel = 'Ler artigo';

  langService = inject(LanguageService);

  get lang() {
    return this.langService.lang();
  }

  get webpWeb() {
    return this.article.coverImage.web.replace('.jpeg', '.webp');
  }

  get webpMobile() {
    return this.article.coverImage.mobile.replace('.jpeg', '.webp');
  }

  formatDate(isoDate: string): string {
    const locale = this.lang === 'pt' ? 'pt-BR' : 'en-US';
    return new Date(isoDate).toLocaleDateString(locale, {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  }
}
