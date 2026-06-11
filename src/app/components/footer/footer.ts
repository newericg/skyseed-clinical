import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-footer',
  imports: [CommonModule],
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
      products: pt ? 'Produtos' : 'Products',
      science: pt ? 'Ciência' : 'Science',
      company: pt ? 'Empresa' : 'Company',
      about: pt ? 'Sobre a Skyseed Clinical' : 'About Skyseed Clinical',
      contact: pt ? 'Contato' : 'Contact',
      learn: pt ? 'Conteúdo Educativo' : 'Educational Content',
      approach: pt ? 'Nossa Abordagem' : 'Our Approach',
      production: pt ? 'Qualidade na Produção' : 'Production Quality',
      benefits: pt ? 'Benefícios ao Bem-Estar' : 'Well-Being Benefits',
      copy: pt
        ? '© 2025 Skyseed Clinical. Todos os direitos reservados.'
        : '© 2025 Skyseed Clinical. All rights reserved.',
      privacy: pt ? 'Política de Privacidade' : 'Privacy Policy',
      terms: pt ? 'Termos de Uso' : 'Terms of Use',
      accessibility: pt ? 'Acessibilidade' : 'Accessibility',
      disclaimer: pt ? 'Aviso Legal' : 'Disclaimer',
    };
  }
}
