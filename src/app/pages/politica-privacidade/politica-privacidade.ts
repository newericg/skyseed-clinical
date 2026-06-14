import { Component, effect, inject } from '@angular/core';
import { LanguageService } from '../../services/language.service';
import { SeoService } from '../../services/seo.service';
import { StructuredDataService } from '../../services/structured-data.service';

interface LegalSection {
  heading?: string;
  paragraphs: string[];
  list?: string[];
}

@Component({
  selector: 'app-politica-privacidade',
  imports: [],
  templateUrl: './politica-privacidade.html',
  styleUrl: './politica-privacidade.scss',
})
export class PoliticaPrivacidadeComponent {
  private seo = inject(SeoService);
  private structuredData = inject(StructuredDataService);
  langService = inject(LanguageService);

  get lang() {
    return this.langService.lang();
  }

  private readonly syncSeo = effect(() => {
    const lang = this.langService.lang();
    this.seo.setPoliticaPrivacidadeMeta(lang);
    const homeLabel = lang === 'pt' ? 'Início' : 'Home';
    const pageLabel = lang === 'pt' ? 'Política de Privacidade' : 'Privacy Policy';
    this.structuredData.setSchemas([
      this.structuredData.getOrganizationSchema(),
      this.structuredData.getWebSiteSchema(),
      this.structuredData.getBreadcrumbSchema([
        { name: homeLabel, path: '/' },
        { name: pageLabel, path: '/politica-de-privacidade' },
      ]),
    ]);
  });

  get t() {
    const pt = this.lang === 'pt';
    return {
      label: pt ? 'Segurança' : 'Legal',
      title: pt ? 'Política de Privacidade' : 'Privacy Policy',
      updated: pt ? 'Última atualização: 11/06/2026' : 'Last updated: June 11, 2026',
      intro: pt
        ? 'A sua privacidade é importante para nós. Esta Política de Privacidade explica de forma simples como coletamos, utilizamos e protegemos as informações fornecidas por você ao utilizar o site Skyseed Clinical.'
        : 'Your privacy matters to us. This Privacy Policy explains in simple terms how we collect, use, and protect the information you provide when using the Skyseed Clinical website.',
    };
  }

  get sections(): LegalSection[] {
    const pt = this.lang === 'pt';
    return [
      {
        heading: pt ? 'Coleta de Informações' : 'Information Collection',
        paragraphs: pt
          ? [
              'Podemos coletar informações fornecidas voluntariamente pelo usuário, como nome, e-mail, telefone e endereço, quando preenchidos em formulários de contato, cadastro ou compra.',
              'Também podemos coletar informações de navegação, como endereço IP, navegador utilizado, páginas visitadas e dados obtidos por meio de cookies.',
            ]
          : [
              'We may collect information voluntarily provided by users, such as name, email, phone number, and address, when submitted through contact, registration, or purchase forms.',
              'We may also collect browsing information, such as IP address, browser used, pages visited, and data obtained through cookies.',
            ],
      },
      {
        heading: pt ? 'Uso das Informações' : 'Use of Information',
        paragraphs: [
          pt
            ? 'As informações coletadas podem ser utilizadas para:'
            : 'Collected information may be used to:',
        ],
        list: pt
          ? [
              'Processar pedidos e prestar atendimento;',
              'Melhorar a experiência de navegação;',
              'Enviar comunicações relacionadas aos nossos produtos e serviços;',
              'Cumprir obrigações legais e regulatórias.',
            ]
          : [
              'Process orders and provide customer support;',
              'Improve the browsing experience;',
              'Send communications related to our products and services;',
              'Comply with legal and regulatory obligations.',
            ],
      },
      {
        heading: pt ? 'Compartilhamento de Dados' : 'Data Sharing',
        paragraphs: pt
          ? [
              'Não comercializamos dados pessoais.',
              'As informações poderão ser compartilhadas apenas com parceiros e prestadores de serviço necessários para a operação do site, processamento de pagamentos, envio de produtos ou cumprimento de exigências legais.',
            ]
          : [
              'We do not sell personal data.',
              'Information may only be shared with partners and service providers necessary for website operation, payment processing, product delivery, or compliance with legal requirements.',
            ],
      },
      {
        heading: 'Cookies',
        paragraphs: [
          pt
            ? 'Utilizamos cookies para melhorar a experiência do usuário e analisar o desempenho do site. Ao continuar navegando, você concorda com a utilização dessas tecnologias.'
            : 'We use cookies to improve the user experience and analyze website performance. By continuing to browse, you agree to the use of these technologies.',
        ],
      },
      {
        heading: pt ? 'Segurança' : 'Security',
        paragraphs: [
          pt
            ? 'Adotamos medidas de segurança adequadas para proteger as informações coletadas contra acessos não autorizados, perdas ou alterações indevidas.'
            : 'We adopt appropriate security measures to protect collected information against unauthorized access, loss, or improper changes.',
        ],
      },
      {
        heading: pt ? 'Alterações desta Política' : 'Changes to This Policy',
        paragraphs: [
          pt
            ? 'Esta Política de Privacidade poderá ser atualizada a qualquer momento. Recomendamos a consulta periódica desta página para acompanhar eventuais alterações.'
            : 'This Privacy Policy may be updated at any time. We recommend checking this page periodically for any changes.',
        ],
      },
      {
        paragraphs: [
          pt
            ? 'Ao utilizar este site, você concorda com os termos desta Política de Privacidade.'
            : 'By using this website, you agree to the terms of this Privacy Policy.',
        ],
      },
    ];
  }
}
