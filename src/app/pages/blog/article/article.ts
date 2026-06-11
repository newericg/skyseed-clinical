import { Component, effect, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { LanguageService } from '../../../services/language.service';
import { SeoService } from '../../../services/seo.service';
import { StructuredDataService } from '../../../services/structured-data.service';
import { BlogArticleMeta, getArticleMetaBySlug } from '../../../data/blog-articles-meta';
import { BlogSection } from '../../../data/blog-articles-content';
import { SITE_URL } from '../../../config/site.config';

@Component({
  selector: 'app-article',
  imports: [RouterLink],
  templateUrl: './article.html',
  styleUrl: './article.scss',
})
export class ArticleComponent {
  private route = inject(ActivatedRoute);
  langService = inject(LanguageService);
  private seo = inject(SeoService);
  private structuredData = inject(StructuredDataService);

  articleMeta?: BlogArticleMeta;
  sections: BlogSection[] = [];

  get lang() {
    return this.langService.lang();
  }

  constructor() {
    const slug = this.route.snapshot.paramMap.get('slug') ?? '';
    this.articleMeta = getArticleMetaBySlug(slug);
  }

  private readonly syncSections = effect(() => {
    const lang = this.langService.lang();
    const slug = this.articleMeta?.slug;
    if (!slug) return;
    import('../../../data/blog-articles-content').then((mod) => {
      this.sections = mod.ARTICLE_SECTIONS[slug]?.[lang] ?? [];
    });
  });

  private readonly syncMeta = effect(() => {
    const lang = this.langService.lang();
    if (!this.articleMeta) {
      this.seo.setPageSeo(
        {
          title:
            lang === 'pt'
              ? 'Artigo não encontrado | Skyseed Clinical'
              : 'Article not found | Skyseed Clinical',
          description:
            lang === 'pt'
              ? 'O artigo solicitado não foi encontrado.'
              : 'The requested article could not be found.',
          path: '/blog',
          noindex: true,
        },
        lang,
      );
      this.structuredData.setSchemas([
        this.structuredData.getOrganizationSchema(),
        this.structuredData.getWebSiteSchema(),
      ]);
      return;
    }

    const title = this.articleMeta.title[lang];
    const description = this.articleMeta.metaDescription[lang];
    this.seo.setPageSeo(
      {
        title: `${title} | Skyseed Clinical`,
        description,
        path: `/blog/${this.articleMeta.slug}`,
        image: `${SITE_URL}${this.articleMeta.coverImage.web}`,
        type: 'article',
        publishedAt: this.articleMeta.publishedAt,
      },
      lang,
    );

    const homeLabel = lang === 'pt' ? 'Início' : 'Home';
    const blogLabel = 'Blog';
    this.structuredData.setSchemas([
      this.structuredData.getOrganizationSchema(),
      this.structuredData.getWebSiteSchema(),
      this.structuredData.getBlogPostingSchema(this.articleMeta, lang),
      this.structuredData.getBreadcrumbSchema([
        { name: homeLabel, path: '/' },
        { name: blogLabel, path: '/blog' },
        { name: title, path: `/blog/${this.articleMeta.slug}` },
      ]),
    ]);
  });

  get t() {
    const pt = this.lang === 'pt';
    return {
      home: pt ? 'Início' : 'Home',
      blog: 'Blog',
      back: pt ? 'Voltar ao blog' : 'Back to blog',
      notFound: pt ? 'Artigo não encontrado' : 'Article not found',
      goHome: pt ? 'Ir para a página inicial' : 'Go to homepage',
    };
  }
}
