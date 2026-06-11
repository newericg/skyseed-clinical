import { Lang } from '../services/language.service';

export type PurchaseChannelType = 'marketplace' | 'partner' | 'distributor' | 'direct';

export interface PurchaseChannel {
  id: string;
  type: PurchaseChannelType;
  name: Record<Lang, string>;
  description?: Record<Lang, string>;
  url: string;
  logoUrl?: string;
}

/** Future purchase channels — empty until partners are defined. */
export const PURCHASE_CHANNELS: PurchaseChannel[] = [];
