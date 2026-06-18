import { Injectable, inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import {
  DEFAULT_OG_IMAGE,
  SITE_EMAIL,
  SITE_NAME,
  SITE_PHONE,
  SITE_URL,
  WHATSAPP_NUMBER,
} from '../config/site.config';
import { BlogArticleMeta } from '../data/blog-articles-meta';

export interface BreadcrumbItem {
  name: string;
  path: string;
}

@Injectable({ providedIn: 'root' })
export class StructuredDataService {
  private doc = inject(DOCUMENT);

  setSchemas(schemas: Record<string, unknown>[]) {
    this.clearSchemas();
    schemas.forEach((schema, index) => {
      const script = this.doc.createElement('script');
      script.type = 'application/ld+json';
      script.id = `structured-data-${index}`;
      script.textContent = JSON.stringify(schema);
      this.doc.head.appendChild(script);
    });
  }

  clearSchemas() {
    this.doc.querySelectorAll('script[id^="structured-data-"]').forEach((el) => el.remove());
  }

  getOrganizationSchema(): Record<string, unknown> {
    return {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
      logo: DEFAULT_OG_IMAGE,
      email: SITE_EMAIL,
      telephone: WHATSAPP_NUMBER ? `+${WHATSAPP_NUMBER}` : SITE_PHONE,
    };
  }

  getWebSiteSchema(): Record<string, unknown> {
    return {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: SITE_NAME,
      url: SITE_URL,
      potentialAction: {
        '@type': 'SearchAction',
        target: `${SITE_URL}/blog?q={search_term_string}`,
        'query-input': 'required name=search_term_string',
      },
    };
  }

  getBlogSchema(articles: BlogArticleMeta[]): Record<string, unknown> {
    return {
      '@context': 'https://schema.org',
      '@type': 'Blog',
      name: `${SITE_NAME} Blog`,
      url: `${SITE_URL}/blog`,
      blogPost: articles.map((article) => ({
        '@type': 'BlogPosting',
        headline: article.title.pt,
        url: `${SITE_URL}/blog/${article.slug}`,
        datePublished: article.publishedAt,
        image: `${SITE_URL}${article.coverImage.web}`,
      })),
    };
  }

  getBlogPostingSchema(article: BlogArticleMeta, lang: 'pt' | 'en'): Record<string, unknown> {
    return {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: article.title[lang],
      description: article.metaDescription[lang],
      image: `${SITE_URL}${article.coverImage.web}`,
      datePublished: article.publishedAt,
      author: {
        '@type': 'Organization',
        name: SITE_NAME,
      },
      publisher: {
        '@type': 'Organization',
        name: SITE_NAME,
        logo: {
          '@type': 'ImageObject',
          url: DEFAULT_OG_IMAGE,
        },
      },
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': `${SITE_URL}/blog/${article.slug}`,
      },
    };
  }

  getBreadcrumbSchema(items: BreadcrumbItem[]): Record<string, unknown> {
    return {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: items.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: item.name,
        item: `${SITE_URL}${item.path === '/' ? '' : item.path}`,
      })),
    };
  }
}
