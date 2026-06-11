import { Component, effect, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { BLOG_ARTICLES_META, BLOG_PAGE_SIZE } from '../../../data/blog-articles-meta';
import { BlogCardComponent } from '../../../components/blog-card/blog-card';
import { LanguageService } from '../../../services/language.service';
import { SeoService } from '../../../services/seo.service';
import { StructuredDataService } from '../../../services/structured-data.service';

@Component({
  selector: 'app-blog-list',
  imports: [RouterLink, BlogCardComponent],
  templateUrl: './blog-list.html',
  styleUrl: './blog-list.scss',
})
export class BlogListComponent {
  private seo = inject(SeoService);
  private structuredData = inject(StructuredDataService);
  private route = inject(ActivatedRoute);
  langService = inject(LanguageService);

  readonly pageSize = BLOG_PAGE_SIZE;
  allArticles = [...BLOG_ARTICLES_META].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  );

  currentPage = 1;

  get lang() {
    return this.langService.lang();
  }

  get totalPages() {
    return Math.max(1, Math.ceil(this.allArticles.length / this.pageSize));
  }

  get articles() {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.allArticles.slice(start, start + this.pageSize);
  }

  get showPagination() {
    return this.allArticles.length > this.pageSize;
  }

  private readonly syncSeo = effect(() => {
    const lang = this.langService.lang();
    this.seo.setBlogListMeta(lang);
    const homeLabel = lang === 'pt' ? 'Início' : 'Home';
    const blogLabel = 'Blog';
    this.structuredData.setSchemas([
      this.structuredData.getOrganizationSchema(),
      this.structuredData.getWebSiteSchema(),
      this.structuredData.getBlogSchema(this.allArticles),
      this.structuredData.getBreadcrumbSchema([
        { name: homeLabel, path: '/' },
        { name: blogLabel, path: '/blog' },
      ]),
    ]);
  });

  constructor() {
    this.route.queryParamMap.subscribe((params) => {
      const page = Number(params.get('page') ?? '1');
      this.currentPage = Number.isFinite(page) && page > 0 ? Math.min(page, this.totalPages) : 1;
    });
  }

  get t() {
    const pt = this.lang === 'pt';
    return {
      label: pt ? 'Blog' : 'Blog',
      title: pt ? 'Conteúdo para o seu bem-estar' : 'Content for your well-being',
      lead: pt
        ? 'Artigos sobre suplementação, hábitos saudáveis e qualidade de vida para apoiar suas escolhas no dia a dia.'
        : 'Articles on supplementation, healthy habits, and quality of life to support your daily choices.',
      readArticle: pt ? 'Ler artigo' : 'Read article',
      prev: pt ? 'Anterior' : 'Previous',
      next: pt ? 'Próxima' : 'Next',
      pagination: pt ? 'Paginação do blog' : 'Blog pagination',
      page: pt ? 'Página' : 'Page',
    };
  }
}
