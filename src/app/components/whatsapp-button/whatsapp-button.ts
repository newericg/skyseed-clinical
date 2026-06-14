import { Component, inject } from '@angular/core';
import { buildWhatsAppUrl, WHATSAPP_NUMBER } from '../../config/site.config';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-whatsapp-button',
  templateUrl: './whatsapp-button.html',
  styleUrl: './whatsapp-button.scss',
})
export class WhatsappButtonComponent {
  private langService = inject(LanguageService);

  readonly whatsappUrl = buildWhatsAppUrl(WHATSAPP_NUMBER);

  get lang() {
    return this.langService.lang();
  }

  get ariaLabel() {
    return this.lang === 'pt'
      ? 'Fale conosco pelo WhatsApp'
      : 'Contact us on WhatsApp';
  }
}
