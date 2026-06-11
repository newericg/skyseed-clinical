import { Injectable, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { Lang } from './language.service';

@Injectable({ providedIn: 'root' })
export class SeoService {
  private title = inject(Title);
  private meta = inject(Meta);

  setPageMeta(pageTitle: string, description: string) {
    this.title.setTitle(pageTitle);
    this.meta.updateTag({ name: 'description', content: description });
  }

  setHomeMeta(lang: Lang) {
    const pt = lang === 'pt';
    this.setPageMeta(
      pt
        ? 'Skyseed Clinical | Suplementos para bem-estar e qualidade de vida'
        : 'Skyseed Clinical | Supplements for well-being and quality of life',
      pt
        ? 'Na Skyseed Clinical, desenvolvemos suplementos com foco em qualidade, segurança e bem-estar no dia a dia. Conheça nossa abordagem e conteúdos sobre magnésio, sono e microbioma intestinal.'
        : 'At Skyseed Clinical, we develop supplements focused on quality, safety, and daily well-being. Discover our approach and content on magnesium, sleep, and gut microbiome.',
    );
  }

  setBlogListMeta(lang: Lang) {
    const pt = lang === 'pt';
    this.setPageMeta(
      pt ? 'Blog | Skyseed Clinical' : 'Blog | Skyseed Clinical',
      pt
        ? 'Artigos sobre suplementação, hábitos saudáveis e qualidade de vida. Conteúdo educativo da Skyseed Clinical.'
        : 'Articles on supplementation, healthy habits, and quality of life. Educational content from Skyseed Clinical.',
    );
  }

  setLancamentosMeta(lang: Lang) {
    const pt = lang === 'pt';
    this.setPageMeta(
      pt ? 'Lançamentos | Skyseed Clinical' : 'Launches | Skyseed Clinical',
      pt
        ? 'Novidades em breve. Estamos preparando os próximos lançamentos da Skyseed Clinical.'
        : 'Coming soon. We are preparing the next Skyseed Clinical launches.',
    );
  }

  setOndeComprarMeta(lang: Lang) {
    const pt = lang === 'pt';
    this.setPageMeta(
      pt ? 'Onde Comprar | Skyseed Clinical' : 'Where to Buy | Skyseed Clinical',
      pt
        ? 'Em breve nossos produtos estarão disponíveis nos principais canais de venda.'
        : 'Our products will soon be available through major sales channels.',
    );
  }

  setContatoMeta(lang: Lang) {
    const pt = lang === 'pt';
    this.setPageMeta(
      pt ? 'Fale Conosco | Skyseed Clinical' : 'Contact Us | Skyseed Clinical',
      pt
        ? 'Entre em contato com a Skyseed Clinical. Envie sua mensagem e nossa equipe retornará o contato.'
        : 'Get in touch with Skyseed Clinical. Send your message and our team will get back to you.',
    );
  }
}
