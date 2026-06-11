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

/** Future product catalog — empty until launches are ready. */
export const PRODUCTS: Product[] = [];
