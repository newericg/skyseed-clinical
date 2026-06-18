import { DOCUMENT } from '@angular/common';
import { Injectable, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { DEFAULT_OG_IMAGE, SITE_NAME, SITE_URL } from '../config/site.config';
import { Lang } from './language.service';

export interface PageSeo {
  title: string;
  description: string;
  path: string;
  image?: string;
  type?: 'website' | 'article';
  publishedAt?: string;
  noindex?: boolean;
}

@Injectable({ providedIn: 'root' })
export class SeoService {
  private title = inject(Title);
  private meta = inject(Meta);
  private doc = inject(DOCUMENT);

  setPageSeo(seo: PageSeo, lang: Lang = 'pt') {
    this.title.setTitle(seo.title);
    this.updateMetaTag('name', 'description', seo.description);

    const robots = seo.noindex ? 'noindex, nofollow' : 'index, follow';
    this.updateMetaTag('name', 'robots', robots);

    const canonicalUrl = this.absoluteUrl(seo.path);
    this.updateLinkTag('canonical', canonicalUrl);

    const image = seo.image ?? DEFAULT_OG_IMAGE;
    const ogType = seo.type ?? 'website';
    const locale = lang === 'pt' ? 'pt_BR' : 'en_US';

    this.updateMetaTag('property', 'og:title', seo.title);
    this.updateMetaTag('property', 'og:description', seo.description);
    this.updateMetaTag('property', 'og:image', image);
    this.updateMetaTag('property', 'og:url', canonicalUrl);
    this.updateMetaTag('property', 'og:type', ogType);
    this.updateMetaTag('property', 'og:locale', locale);
    this.updateMetaTag('property', 'og:site_name', SITE_NAME);

    this.updateMetaTag('name', 'twitter:card', 'summary_large_image');
    this.updateMetaTag('name', 'twitter:title', seo.title);
    this.updateMetaTag('name', 'twitter:description', seo.description);
    this.updateMetaTag('name', 'twitter:image', image);

    if (seo.type === 'article' && seo.publishedAt) {
      this.updateMetaTag('property', 'article:published_time', seo.publishedAt);
    } else {
      this.removeMetaTag('property', 'article:published_time');
    }

    this.setDocumentLang(lang);
  }

  setPageMeta(pageTitle: string, description: string, path = '/', lang: Lang = 'pt') {
    this.setPageSeo({ title: pageTitle, description, path }, lang);
  }

  setHomeMeta(lang: Lang) {
    const pt = lang === 'pt';
    this.setPageSeo(
      {
        title: 'Skyseed Clinical',
        description: pt
          ? 'Na Skyseed Clinical, desenvolvemos suplementos com foco em qualidade, segurança e bem-estar no dia a dia. Conheça nossa abordagem e conteúdos sobre magnésio, sono e microbioma intestinal.'
          : 'At Skyseed Clinical, we develop supplements focused on quality, safety, and daily well-being. Discover our approach and content on magnesium, sleep, and gut microbiome.',
        path: '/',
      },
      lang,
    );
  }

  setBlogListMeta(lang: Lang) {
    const pt = lang === 'pt';
    this.setPageSeo(
      {
        title: 'Blog | Skyseed Clinical',
        description: pt
          ? 'Artigos sobre suplementação, hábitos saudáveis e qualidade de vida. Conteúdo educativo da Skyseed Clinical.'
          : 'Articles on supplementation, healthy habits, and quality of life. Educational content from Skyseed Clinical.',
        path: '/blog',
      },
      lang,
    );
  }

  setLancamentosMeta(lang: Lang) {
    const pt = lang === 'pt';
    this.setPageSeo(
      {
        title: pt ? 'Lançamentos | Skyseed Clinical' : 'Launches | Skyseed Clinical',
        description: pt
          ? 'Conheça o 5 Magnésios da Skyseed Clinical — suplemento com cinco formas de magnésio em cápsulas.'
          : 'Discover 5 Magnesium by Skyseed Clinical — a supplement with five forms of magnesium in capsules.',
        path: '/lancamentos',
      },
      lang,
    );
  }

  setOndeComprarMeta(lang: Lang) {
    const pt = lang === 'pt';
    this.setPageSeo(
      {
        title: pt ? 'Onde Comprar | Skyseed Clinical' : 'Where to Buy | Skyseed Clinical',
        description: pt
          ? 'Em breve nossos produtos estarão disponíveis nos principais canais de venda.'
          : 'Our products will soon be available through major sales channels.',
        path: '/onde-comprar',
      },
      lang,
    );
  }

  setContatoMeta(lang: Lang) {
    const pt = lang === 'pt';
    this.setPageSeo(
      {
        title: pt ? 'Fale Conosco | Skyseed Clinical' : 'Contact Us | Skyseed Clinical',
        description: pt
          ? 'Entre em contato com a Skyseed Clinical. Envie sua mensagem e nossa equipe retornará o contato.'
          : 'Get in touch with Skyseed Clinical. Send your message and our team will get back to you.',
        path: '/contato',
      },
      lang,
    );
  }

  setPoliticaPrivacidadeMeta(lang: Lang) {
    const pt = lang === 'pt';
    this.setPageSeo(
      {
        title: pt ? 'Política de Privacidade | Skyseed Clinical' : 'Privacy Policy | Skyseed Clinical',
        description: pt
          ? 'Saiba como a Skyseed Clinical coleta, utiliza e protege suas informações pessoais.'
          : 'Learn how Skyseed Clinical collects, uses, and protects your personal information.',
        path: '/politica-de-privacidade',
      },
      lang,
    );
  }

  setTermosDeUsoMeta(lang: Lang) {
    const pt = lang === 'pt';
    this.setPageSeo(
      {
        title: pt ? 'Termos de Uso | Skyseed Clinical' : 'Terms of Use | Skyseed Clinical',
        description: pt
          ? 'Leia os Termos de Uso do site Skyseed Clinical e as condições para utilização dos nossos serviços.'
          : 'Read the Skyseed Clinical website Terms of Use and the conditions for using our services.',
        path: '/termos-de-uso',
      },
      lang,
    );
  }

  setNotFoundMeta(lang: Lang) {
    const pt = lang === 'pt';
    this.setPageSeo(
      {
        title: pt ? 'Página não encontrada | Skyseed Clinical' : 'Page not found | Skyseed Clinical',
        description: pt
          ? 'A página solicitada não foi encontrada.'
          : 'The requested page could not be found.',
        path: '/404',
        noindex: true,
      },
      lang,
    );
  }

  setDocumentLang(lang: Lang) {
    this.doc.documentElement.lang = lang === 'pt' ? 'pt-BR' : 'en';
  }

  private absoluteUrl(path: string): string {
    const normalized = path.startsWith('/') ? path : `/${path}`;
    return `${SITE_URL}${normalized === '/' ? '' : normalized}`;
  }

  private updateMetaTag(attr: 'name' | 'property', key: string, content: string) {
    this.meta.updateTag({ [attr]: key, content });
  }

  private removeMetaTag(attr: 'name' | 'property', key: string) {
    this.meta.removeTag(`${attr}="${key}"`);
  }

  private updateLinkTag(rel: string, href: string) {
    const head = this.doc.head;
    let link = head.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null;
    if (!link) {
      link = this.doc.createElement('link');
      link.setAttribute('rel', rel);
      head.appendChild(link);
    }
    link.setAttribute('href', href);
  }
}
