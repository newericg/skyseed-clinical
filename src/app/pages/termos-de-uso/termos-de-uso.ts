import { Component, effect, inject } from '@angular/core';
import { LanguageService } from '../../services/language.service';
import { SeoService } from '../../services/seo.service';
import { StructuredDataService } from '../../services/structured-data.service';

interface LegalSection {
  heading?: string;
  paragraphs: string[];
}

@Component({
  selector: 'app-termos-de-uso',
  imports: [],
  templateUrl: './termos-de-uso.html',
  styleUrl: './termos-de-uso.scss',
})
export class TermosDeUsoComponent {
  private seo = inject(SeoService);
  private structuredData = inject(StructuredDataService);
  langService = inject(LanguageService);

  get lang() {
    return this.langService.lang();
  }

  private readonly syncSeo = effect(() => {
    const lang = this.langService.lang();
    this.seo.setTermosDeUsoMeta(lang);
    const homeLabel = lang === 'pt' ? 'Início' : 'Home';
    const pageLabel = lang === 'pt' ? 'Termos de Uso' : 'Terms of Use';
    this.structuredData.setSchemas([
      this.structuredData.getOrganizationSchema(),
      this.structuredData.getWebSiteSchema(),
      this.structuredData.getBreadcrumbSchema([
        { name: homeLabel, path: '/' },
        { name: pageLabel, path: '/termos-de-uso' },
      ]),
    ]);
  });

  get t() {
    const pt = this.lang === 'pt';
    return {
      label: pt ? 'Segurança' : 'Legal',
      title: pt ? 'Termos de Uso' : 'Terms of Use',
      updated: pt ? 'Última atualização: 11/06/2026' : 'Last updated: June 11, 2026',
      intro: pt
        ? 'Ao acessar e utilizar o site Skyseed Clinical, você concorda com os presentes Termos de Uso. Caso não concorde com qualquer disposição aqui descrita, recomendamos que não utilize este site.'
        : 'By accessing and using the Skyseed Clinical website, you agree to these Terms of Use. If you do not agree with any provision described here, we recommend that you do not use this website.',
    };
  }

  get sections(): LegalSection[] {
    const pt = this.lang === 'pt';
    return [
      {
        heading: pt ? 'Uso do Site' : 'Use of the Website',
        paragraphs: pt
          ? [
              'O usuário compromete-se a utilizar este site de forma lícita, respeitando a legislação vigente, a boa-fé e os presentes Termos de Uso.',
              'É proibido utilizar o site para atividades que possam causar danos, interferências, sobrecarga dos sistemas ou violação de direitos de terceiros.',
            ]
          : [
              'Users agree to use this website lawfully, respecting applicable legislation, good faith, and these Terms of Use.',
              'It is prohibited to use the website for activities that may cause damage, interference, system overload, or violation of third-party rights.',
            ],
      },
      {
        heading: pt ? 'Informações e Conteúdo' : 'Information and Content',
        paragraphs: pt
          ? [
              'As informações disponibilizadas neste site possuem caráter informativo e comercial. Embora busquemos manter todas as informações atualizadas e precisas, não garantimos que o conteúdo esteja livre de erros, omissões ou desatualizações.',
              'Reservamo-nos o direito de alterar, atualizar ou remover conteúdos a qualquer momento, sem aviso prévio.',
            ]
          : [
              'The information provided on this website is for informational and commercial purposes. Although we strive to keep all information up to date and accurate, we do not guarantee that the content is free from errors, omissions, or outdated information.',
              'We reserve the right to change, update, or remove content at any time without prior notice.',
            ],
      },
      {
        heading: pt ? 'Propriedade Intelectual' : 'Intellectual Property',
        paragraphs: [
          pt
            ? 'Todo o conteúdo presente neste site, incluindo textos, imagens, logotipos, marcas, gráficos e demais materiais, é protegido pela legislação aplicável de propriedade intelectual e não poderá ser copiado, reproduzido, distribuído ou utilizado sem autorização prévia.'
            : 'All content on this website, including text, images, logos, trademarks, graphics, and other materials, is protected by applicable intellectual property laws and may not be copied, reproduced, distributed, or used without prior authorization.',
        ],
      },
      {
        heading: pt ? 'Links para Terceiros' : 'Third-Party Links',
        paragraphs: [
          pt
            ? 'Este site poderá conter links para páginas e serviços de terceiros. Não nos responsabilizamos pelo conteúdo, políticas ou práticas adotadas por esses sites externos.'
            : 'This website may contain links to third-party pages and services. We are not responsible for the content, policies, or practices adopted by those external websites.',
        ],
      },
      {
        heading: pt ? 'Limitação de Responsabilidade' : 'Limitation of Liability',
        paragraphs: [
          pt
            ? 'Não nos responsabilizamos por eventuais danos decorrentes da indisponibilidade temporária do site, falhas técnicas, interrupções de acesso ou quaisquer problemas relacionados à utilização da internet e de sistemas de terceiros.'
            : 'We are not liable for any damages arising from temporary unavailability of the website, technical failures, access interruptions, or any issues related to the use of the internet and third-party systems.',
        ],
      },
      {
        heading: pt ? 'Alterações dos Termos' : 'Changes to the Terms',
        paragraphs: [
          pt
            ? 'Estes Termos de Uso poderão ser modificados a qualquer momento, sem aviso prévio. A versão mais recente estará sempre disponível nesta página.'
            : 'These Terms of Use may be modified at any time without prior notice. The most recent version will always be available on this page.',
        ],
      },
      {
        heading: pt ? 'Aceitação dos Termos' : 'Acceptance of the Terms',
        paragraphs: [
          pt
            ? 'Ao acessar e utilizar este site, o usuário declara ter lido, compreendido e aceitado integralmente estes Termos de Uso.'
            : 'By accessing and using this website, the user declares that they have read, understood, and fully accepted these Terms of Use.',
        ],
      },
    ];
  }
}
