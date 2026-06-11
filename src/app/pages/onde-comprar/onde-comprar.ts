import { Component, effect, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PURCHASE_CHANNELS, PurchaseChannelType } from '../../data/purchase-channels';
import { LanguageService } from '../../services/language.service';
import { SeoService } from '../../services/seo.service';

@Component({
  selector: 'app-onde-comprar',
  imports: [CommonModule],
  templateUrl: './onde-comprar.html',
  styleUrl: './onde-comprar.scss',
})
export class OndeComprarComponent {
  private seo = inject(SeoService);
  langService = inject(LanguageService);

  channels = PURCHASE_CHANNELS;

  get lang() {
    return this.langService.lang();
  }

  get hasChannels() {
    return this.channels.length > 0;
  }

  readonly channelSections: { type: PurchaseChannelType; titleKey: 'marketplaces' | 'partners' | 'distributors' | 'direct' }[] = [
    { type: 'marketplace', titleKey: 'marketplaces' },
    { type: 'partner', titleKey: 'partners' },
    { type: 'distributor', titleKey: 'distributors' },
    { type: 'direct', titleKey: 'direct' },
  ];

  channelsByType(type: PurchaseChannelType) {
    return this.channels.filter((c) => c.type === type);
  }

  private readonly syncSeo = effect(() => {
    this.seo.setOndeComprarMeta(this.langService.lang());
  });

  get t() {
    const pt = this.lang === 'pt';
    return {
      label: pt ? 'Onde Comprar' : 'Where to Buy',
      title: pt ? 'Encontre a Skyseed Clinical' : 'Find Skyseed Clinical',
      lead: pt
        ? 'Em breve nossos produtos estarão disponíveis nos principais canais de venda.'
        : 'Our products will soon be available through major sales channels.',
      subtitle: pt
        ? 'Estamos estruturando parcerias com marketplaces, lojas e distribuidores para levar nossas fórmulas até você com praticidade e confiança.'
        : 'We are building partnerships with marketplaces, stores, and distributors to bring our formulas to you with convenience and trust.',
      marketplaces: pt ? 'Marketplaces' : 'Marketplaces',
      partners: pt ? 'Lojas Parceiras' : 'Partner Stores',
      distributors: pt ? 'Distribuidores' : 'Distributors',
      direct: pt ? 'Compra Direta' : 'Direct Purchase',
      visit: pt ? 'Visitar' : 'Visit',
    };
  }
}
