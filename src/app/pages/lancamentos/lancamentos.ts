import { Component, effect, inject } from '@angular/core';
import { PRODUCTS } from '../../data/products';
import { ProductCardComponent } from '../../components/product-card/product-card';
import { LanguageService } from '../../services/language.service';
import { SeoService } from '../../services/seo.service';
import { StructuredDataService } from '../../services/structured-data.service';

@Component({
  selector: 'app-lancamentos',
  imports: [ProductCardComponent],
  templateUrl: './lancamentos.html',
  styleUrl: './lancamentos.scss',
})
export class LancamentosComponent {
  private seo = inject(SeoService);
  private structuredData = inject(StructuredDataService);
  langService = inject(LanguageService);

  products = PRODUCTS;

  get lang() {
    return this.langService.lang();
  }

  get hasProducts() {
    return this.products.length > 0;
  }

  private readonly syncSeo = effect(() => {
    const lang = this.langService.lang();
    this.seo.setLancamentosMeta(lang);
    const homeLabel = lang === 'pt' ? 'Início' : 'Home';
    const pageLabel = lang === 'pt' ? 'Lançamentos' : 'Launches';
    this.structuredData.setSchemas([
      this.structuredData.getOrganizationSchema(),
      this.structuredData.getWebSiteSchema(),
      this.structuredData.getBreadcrumbSchema([
        { name: homeLabel, path: '/' },
        { name: pageLabel, path: '/lancamentos' },
      ]),
    ]);
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
