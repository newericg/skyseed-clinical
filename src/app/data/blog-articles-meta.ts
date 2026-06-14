import { Lang } from '../services/language.service';
import { PUBLISHED_BLOG_META, PUBLISHED_BLOG_SLUGS } from './blog-published.generated';

export interface BlogCoverImage {
  web: string;
  mobile: string;
  alt: Record<Lang, string>;
}

export interface BlogArticleMeta {
  slug: string;
  title: Record<Lang, string>;
  excerpt: Record<Lang, string>;
  metaDescription: Record<Lang, string>;
  publishedAt: string;
  coverImage: BlogCoverImage;
}

export const BLOG_PAGE_SIZE = 6;

const STATIC_BLOG_ARTICLES_META: BlogArticleMeta[] = [
  {
    slug: 'magnesio-equilibrio-organismo',
    title: {
      pt: 'O Poder do Magnésio: Um Nutriente Essencial para o Equilíbrio do Organismo',
      en: 'The Power of Magnesium: An Essential Nutrient for Bodily Balance',
    },
    excerpt: {
      pt: 'O magnésio participa de mais de 300 reações bioquímicas e influencia energia, músculos e sistema nervoso. Entenda sinais de baixa ingestão, sua relação com estresse e sono, e como a alimentação e a suplementação podem apoiar níveis adequados.',
      en: 'Magnesium plays a role in over 300 biochemical reactions and influences energy, muscles, and the nervous system. Learn about signs of low intake, its connection to stress and sleep, and how diet and supplementation can help maintain adequate levels.',
    },
    metaDescription: {
      pt: 'Descubra a importância do magnésio para equilíbrio, estresse, sono e bem-estar diário. Conteúdo educativo da Skyseed Clinical sobre suplementação e qualidade de vida.',
      en: 'Discover the importance of magnesium for balance, stress, sleep, and daily well-being. Educational content from Skyseed Clinical on supplementation and quality of life.',
    },
    publishedAt: '2025-03-15',
    coverImage: {
      web: '/assets/blogs/magnesio-web.jpeg',
      mobile: '/assets/blogs/magnesio-mobile.jpeg',
      alt: {
        pt: 'Magnésio e equilíbrio do organismo — suplementação e bem-estar',
        en: 'Magnesium and bodily balance — supplementation and well-being',
      },
    },
  },
  {
    slug: 'higiene-do-sono',
    title: {
      pt: 'Higiene do Sono: Pequenos Hábitos Que Fazem Grande Diferença',
      en: 'Sleep Hygiene: Small Habits That Make a Big Difference',
    },
    excerpt: {
      pt: 'A higiene do sono reúne hábitos que ajudam o corpo e a mente a descansar melhor. Conheça práticas como horários regulares, redução de telas, ambiente adequado e rotina de desaceleração para melhorar a qualidade do descanso.',
      en: 'Sleep hygiene brings together habits that help body and mind rest better. Learn practices such as regular schedules, reduced screen time, a suitable environment, and a wind-down routine to improve rest quality.',
    },
    metaDescription: {
      pt: 'Aprenda sobre higiene do sono, hábitos noturnos e bem-estar diário. Dicas educativas da Skyseed Clinical para uma rotina de descanso mais equilibrada.',
      en: 'Learn about sleep hygiene, nighttime habits, and daily well-being. Educational tips from Skyseed Clinical for a more balanced rest routine.',
    },
    publishedAt: '2025-04-22',
    coverImage: {
      web: '/assets/blogs/sono-web.jpeg',
      mobile: '/assets/blogs/sono-mobile.jpeg',
      alt: {
        pt: 'Higiene do sono e hábitos para um descanso de qualidade',
        en: 'Sleep hygiene and habits for quality rest',
      },
    },
  },
  {
    slug: 'microbioma-intestinal',
    title: {
      pt: 'Microbioma Intestinal: O Ecossistema Invisível Que Influencia Sua Saúde',
      en: 'Gut Microbiome: The Invisible Ecosystem That Influences Your Health',
    },
    excerpt: {
      pt: 'O microbioma intestinal é formado por trilhões de microrganismos que influenciam digestão, imunidade e bem-estar mental. Saiba como hábitos diários ajudam a manter esse ecossistema em equilíbrio.',
      en: 'The gut microbiome is made up of trillions of microorganisms that influence digestion, immunity, and mental well-being. Learn how daily habits help keep this ecosystem in balance.',
    },
    metaDescription: {
      pt: 'Entenda o microbioma intestinal, digestão, imunidade e eixo intestino-cérebro. Conteúdo educativo da Skyseed Clinical sobre saúde diária e bem-estar.',
      en: 'Understand the gut microbiome, digestion, immunity, and the gut-brain axis. Educational content from Skyseed Clinical on daily health and well-being.',
    },
    publishedAt: '2025-05-10',
    coverImage: {
      web: '/assets/blogs/microbioma-web.jpeg',
      mobile: '/assets/blogs/microbioma-mobile.jpeg',
      alt: {
        pt: 'Microbioma intestinal e saúde digestiva',
        en: 'Gut microbiome and digestive health',
      },
    },
  },
];

function mergeArticleMeta(): BlogArticleMeta[] {
  const bySlug = new Map(STATIC_BLOG_ARTICLES_META.map((article) => [article.slug, article]));
  for (const article of PUBLISHED_BLOG_META) {
    bySlug.set(article.slug, article);
  }
  return [...bySlug.values()].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  );
}

export const BLOG_ARTICLES_META = mergeArticleMeta();

export const BLOG_ARTICLE_SLUGS = [
  ...new Set([...STATIC_BLOG_ARTICLES_META.map((a) => a.slug), ...PUBLISHED_BLOG_SLUGS]),
];

export function getArticleMetaBySlug(slug: string): BlogArticleMeta | undefined {
  return BLOG_ARTICLES_META.find((a) => a.slug === slug);
}
