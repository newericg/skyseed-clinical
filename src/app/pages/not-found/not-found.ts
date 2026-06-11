import { Component, effect, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LanguageService } from '../../services/language.service';
import { SeoService } from '../../services/seo.service';
import { StructuredDataService } from '../../services/structured-data.service';

@Component({
  selector: 'app-not-found',
  imports: [RouterLink],
  templateUrl: './not-found.html',
  styleUrl: './not-found.scss',
})
export class NotFoundComponent {
  private seo = inject(SeoService);
  private structuredData = inject(StructuredDataService);
  langService = inject(LanguageService);

  get lang() {
    return this.langService.lang();
  }

  private readonly syncSeo = effect(() => {
    const lang = this.langService.lang();
    this.seo.setNotFoundMeta(lang);
    this.structuredData.setSchemas([
      this.structuredData.getOrganizationSchema(),
      this.structuredData.getWebSiteSchema(),
    ]);
  });

  get t() {
    const pt = this.lang === 'pt';
    return {
      title: pt ? 'Página não encontrada' : 'Page not found',
      message: pt
        ? 'A página que você procura não existe ou foi movida.'
        : 'The page you are looking for does not exist or has been moved.',
      home: pt ? 'Voltar para a página inicial' : 'Back to homepage',
    };
  }
}
