import { Lang } from '../services/language.service';

export interface ProductImage {
  web: string;
  mobile: string;
  alt: Record<Lang, string>;
}

export interface Product {
  slug: string;
  name: Record<Lang, string>;
  description: Record<Lang, string>;
  image: ProductImage;
  badge?: Record<Lang, string>;
  featured?: boolean;
}

export interface ProductMagnesiumBenefit {
  form: Record<Lang, string>;
  benefit: Record<Lang, string>;
}

export interface ProductStore {
  id: string;
  name: Record<Lang, string>;
  logo: string;
  url?: string;
}

export interface ProductRelease {
  slug: string;
  name: Record<Lang, string>;
  image: string;
  imageAlt: Record<Lang, string>;
  intro: Record<Lang, string>;
  blendIntro: Record<Lang, string>;
  benefits: ProductMagnesiumBenefit[];
  combination: Record<Lang, string>;
  closing: Record<Lang, string>;
  stores: ProductStore[];
}

/** Future product catalog — empty until launches are ready. */
export const PRODUCTS: Product[] = [];

export const PRODUCT_RELEASES: ProductRelease[] = [
  {
    slug: '5-magnesios',
    name: { pt: '5 Magnésios', en: '5 Magnesium' },
    image: '/assets/releases/magnesium.jpeg',
    imageAlt: {
      pt: '5 Magnésios Skyseed Clinical — suplemento alimentar em cápsulas',
      en: '5 Magnesium Skyseed Clinical — dietary supplement in capsules',
    },
    intro: {
      pt: 'O blend “5 magnésios” da Skyseed nasce da compreensão de que diferentes formas de magnésio possuem funções específicas e, quando combinadas de forma adequada, permitem uma atuação mais completa no organismo.',
      en: 'Skyseed’s “5 magnesium” blend is built on the understanding that different forms of magnesium have specific roles and, when combined appropriately, support a more complete action in the body.',
    },
    blendIntro: {
      pt: 'No nosso blend, reunimos cinco formas de magnésio, cada uma com um papel bem definido:',
      en: 'In our blend, we bring together five forms of magnesium, each with a clearly defined role:',
    },
    benefits: [
      {
        form: { pt: 'Bisglicinato', en: 'Bisglycinate' },
        benefit: {
          pt: 'suporte ao sistema nervoso e relaxamento',
          en: 'nervous system support and relaxation',
        },
      },
      {
        form: { pt: 'Malato', en: 'Malate' },
        benefit: {
          pt: 'energia e desempenho muscular',
          en: 'energy and muscular performance',
        },
      },
      {
        form: { pt: 'Taurato', en: 'Taurate' },
        benefit: {
          pt: 'suporte cardiovascular e equilíbrio',
          en: 'cardiovascular support and balance',
        },
      },
      {
        form: { pt: 'Citrato', en: 'Citrate' },
        benefit: {
          pt: 'absorção eficiente e apoio ao funcionamento intestinal',
          en: 'efficient absorption and digestive support',
        },
      },
      {
        form: { pt: 'Cloreto', en: 'Chloride' },
        benefit: {
          pt: 'equilíbrio eletrolítico e hidratação celular',
          en: 'electrolyte balance and cellular hydration',
        },
      },
    ],
    combination: {
      pt: 'A combinação dessas formas permite uma atuação mais ampla, respeitando a complexidade do organismo e a forma como seus sistemas se conectam.',
      en: 'Combining these forms allows for broader support, respecting the complexity of the body and how its systems work together.',
    },
    closing: {
      pt: 'Adquira já o nosso Blend 5 Magnésios Skyseed Clinical e experimente os benefícios de uma fórmula completa, para quem busca mais qualidade de vida através de uma suplementação de excelência!',
      en: 'Get our Skyseed Clinical 5 Magnesium Blend today and experience the benefits of a complete formula for those seeking better quality of life through excellent supplementation!',
    },
    stores: [
      {
        id: 'shopee',
        name: { pt: 'Shopee', en: 'Shopee' },
        logo: '/assets/releases/shopee.png',
      },
      {
        id: 'mercado-livre',
        name: { pt: 'Mercado Livre', en: 'Mercado Livre' },
        logo: '/assets/releases/mercado-livre.png',
      },
    ],
  },
];
