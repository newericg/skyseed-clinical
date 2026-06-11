import { Component, OnInit, effect, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { LanguageService } from '../../../services/language.service';
import { SeoService } from '../../../services/seo.service';
import { BlogArticle, getArticleBySlug } from '../../../data/blog-articles';

@Component({
  selector: 'app-article',
  imports: [CommonModule, RouterLink],
  templateUrl: './article.html',
  styleUrl: './article.scss',
})
export class ArticleComponent implements OnInit {
  private route = inject(ActivatedRoute);
  langService = inject(LanguageService);
  private seo = inject(SeoService);

  article: BlogArticle | undefined;

  get lang() {
    return this.langService.lang();
  }

  private readonly syncMeta = effect(() => {
    const lang = this.langService.lang();
    if (!this.article) return;
    const title = this.article.title[lang];
    const description = this.article.metaDescription[lang];
    this.seo.setPageMeta(`${title} | Skyseed Clinical`, description);
  });

  ngOnInit() {
    const slug = this.route.snapshot.paramMap.get('slug') ?? '';
    this.article = getArticleBySlug(slug);
  }

  get t() {
    const pt = this.lang === 'pt';
    return {
      back: pt ? 'Voltar ao blog' : 'Back to blog',
      notFound: pt ? 'Artigo não encontrado' : 'Article not found',
      home: pt ? 'Ir para a página inicial' : 'Go to homepage',
    };
  }
}
