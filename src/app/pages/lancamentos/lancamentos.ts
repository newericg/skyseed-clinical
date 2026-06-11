import { Component, effect, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PRODUCTS } from '../../data/products';
import { ProductCardComponent } from '../../components/product-card/product-card';
import { LanguageService } from '../../services/language.service';
import { SeoService } from '../../services/seo.service';

@Component({
  selector: 'app-lancamentos',
  imports: [CommonModule, ProductCardComponent],
  templateUrl: './lancamentos.html',
  styleUrl: './lancamentos.scss',
})
export class LancamentosComponent {
  private seo = inject(SeoService);
  langService = inject(LanguageService);

  products = PRODUCTS;

  get lang() {
    return this.langService.lang();
  }

  get hasProducts() {
    return this.products.length > 0;
  }

  private readonly syncSeo = effect(() => {
    this.seo.setLancamentosMeta(this.langService.lang());
  });

  get t() {
    const pt = this.lang === 'pt';
    return {
      label: pt ? 'Lançamentos' : 'Launches',
      title: pt ? 'Novidades em breve' : 'Coming soon',
      lead: pt
        ? 'Estamos preparando os próximos lançamentos da Skyseed Clinical.'
        : 'We are preparing the next Skyseed Clinical launches.',
      subtitle: pt
        ? 'Fórmulas desenvolvidas com critério, qualidade e transparência — em breve disponíveis para você.'
        : 'Formulas developed with care, quality, and transparency — coming soon for you.',
      cta: pt ? 'Saiba mais' : 'Learn more',
    };
  }
}
