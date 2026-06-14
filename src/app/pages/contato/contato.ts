import { Component, effect, inject } from '@angular/core';
import { ContactFormComponent } from '../../components/contact-form/contact-form';
import { LanguageService } from '../../services/language.service';
import { SeoService } from '../../services/seo.service';
import { StructuredDataService } from '../../services/structured-data.service';

@Component({
  selector: 'app-contato',
  imports: [ContactFormComponent],
  templateUrl: './contato.html',
  styleUrl: './contato.scss',
})
export class ContatoComponent {
  private seo = inject(SeoService);
  private structuredData = inject(StructuredDataService);
  langService = inject(LanguageService);

  get lang() {
    return this.langService.lang();
  }

  private readonly syncSeo = effect(() => {
    const lang = this.langService.lang();
    this.seo.setContatoMeta(lang);
    const homeLabel = lang === 'pt' ? 'Início' : 'Home';
    const contactLabel = lang === 'pt' ? 'Fale Conosco' : 'Contact Us';
    this.structuredData.setSchemas([
      this.structuredData.getOrganizationSchema(),
      this.structuredData.getWebSiteSchema(),
      this.structuredData.getBreadcrumbSchema([
        { name: homeLabel, path: '/' },
        { name: contactLabel, path: '/contato' },
      ]),
    ]);
  });

  get t() {
    const pt = this.lang === 'pt';
    return {
      label: pt ? 'Fale Conosco' : 'Contact Us',
      title: pt ? 'Estamos aqui para ouvir você' : 'We are here to hear from you',
      lead: pt
        ? 'Envie sua mensagem e nossa equipe retornará o contato o mais breve possível.'
        : 'Send your message and our team will get back to you as soon as possible.',
      contactInfo: pt ? 'Outros canais' : 'Other channels',
      whatsapp: 'WhatsApp',
      emailLabel: 'E-mail',
      social: pt ? 'Redes sociais' : 'Social media',
      whatsappSoon: pt ? 'Em breve' : 'Coming soon',
      emailValue: 'contato@skyseed.com.br',
    };
  }
}
