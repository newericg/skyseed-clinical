import { Component, effect, inject } from '@angular/core';
import { PRODUCT_RELEASES } from '../../data/products';
import { ProductReleaseComponent } from '../../components/product-release/product-release';
import { LanguageService } from '../../services/language.service';
import { SeoService } from '../../services/seo.service';
import { StructuredDataService } from '../../services/structured-data.service';

@Component({
  selector: 'app-lancamentos',
  imports: [ProductReleaseComponent],
  templateUrl: './lancamentos.html',
  styleUrl: './lancamentos.scss',
})
export class LancamentosComponent {
  private seo = inject(SeoService);
  private structuredData = inject(StructuredDataService);
  langService = inject(LanguageService);

  products = PRODUCT_RELEASES;

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
      title: pt ? 'Nossos lançamentos' : 'Our launches',
      lead: pt
        ? 'Fórmulas desenvolvidas com critério, qualidade e transparência — disponíveis para você.'
        : 'Formulas developed with care, quality, and transparency — available for you.',
      subtitle: pt
        ? 'Fórmulas desenvolvidas com critério, qualidade e transparência — em breve disponíveis para você.'
        : 'Formulas developed with care, quality, and transparency — coming soon for you.',
      buyNow: pt ? 'COMPRE AGORA (Clique no link abaixo)' : 'BUY NOW (Click the link below)',
    };
  }
}
