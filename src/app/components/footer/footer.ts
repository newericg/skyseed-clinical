import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-footer',
  imports: [RouterLink],
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
})
export class FooterComponent {
  langService = inject(LanguageService);

  get lang() {
    return this.langService.lang();
  }

  get t() {
    const pt = this.lang === 'pt';
    return {
      blurb: pt
        ? 'Na Skyseed Clinical, desenvolvemos suplementos com foco em qualidade, segurança e bem-estar no dia a dia. Estamos aqui para fazer parte da sua jornada com transparência e simplicidade.'
        : 'At Skyseed Clinical, we develop supplements focused on quality, safety, and daily well-being. We are here to be part of your journey with transparency and simplicity.',
      navTitle: pt ? 'Institucional' : 'Company',
      about: pt ? 'Sobre Nós' : 'About Us',
      lancamentos: pt ? 'Lançamentos' : 'Launches',
      blog: pt ? 'Blog' : 'Blog',
      whereToBuy: pt ? 'Onde Comprar' : 'Where to Buy',
      contact: pt ? 'Fale Conosco' : 'Contact Us',
      legalTitle: pt ? 'Segurança' : 'Legal',
      privacy: pt ? 'Política de Privacidade' : 'Privacy Policy',
      terms: pt ? 'Termos de Uso' : 'Terms of Use',
      resellerTitle: pt ? 'Seja um Revendedor' : 'Become a Reseller',
      resellerDesc: pt
        ? 'Torne-se parceiro da Skyseed Clinical e receba mais informações sobre oportunidades comerciais.'
        : 'Become a Skyseed Clinical partner and receive more information about commercial opportunities.',
      resellerBtn: pt ? 'Quero Ser Revendedor' : 'Become a Reseller',
      copy: pt
        ? '© 2025 Skyseed Clinical. Todos os direitos reservados.'
        : '© 2025 Skyseed Clinical. All rights reserved.',
    };
  }
}
