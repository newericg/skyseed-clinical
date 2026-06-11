import { Component, AfterViewInit, effect, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { LanguageService } from '../../services/language.service';
import { SeoService } from '../../services/seo.service';
import { BLOG_ARTICLES } from '../../data/blog-articles';

@Component({
  selector: 'app-home',
  imports: [CommonModule, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class HomeComponent implements AfterViewInit {
  langService = inject(LanguageService);
  private seo = inject(SeoService);
  private route = inject(ActivatedRoute);

  articles = BLOG_ARTICLES;

  get lang() { return this.langService.lang(); }

  private readonly syncSeo = effect(() => {
    this.seo.setHomeMeta(this.langService.lang());
  });

  get t() {
    const pt = this.lang === 'pt';
    return {
      // Hero — intocado
      heroEyebrow: 'DS-01® Daily Synbiotic',
      heroH1a: pt ? 'Saúde do corpo inteiro' : 'Whole body health',
      heroH1b: pt ? 'começa no intestino' : 'starts in the gut',
      heroSub: pt
        ? 'Formulações com suporte contínuo usando ingredientes cientificamente estudados para reduzir inchaço, gases e irregularidades.*'
        : 'Formulations that provide sustained support using key scientifically and clinically-studied ingredients to ease bloating, gas, and irregularity.*',
      heroShop: pt ? 'Comprar Agora' : 'Shop Now',
      heroScience: pt ? 'Nossa Ciência' : 'Our Science',
      statLabel1: pt ? 'Cepas Probióticas' : 'Probiotic Strains',
      statLabel2: pt ? 'UFSa por dose' : 'AFU per dose',
      statLabel3: pt ? 'Ensaios Clínicos' : 'Clinical Trials',
      // About
      aboutLabel: pt ? 'Skyseed Clinical' : 'Skyseed Clinical',
      aboutH2: pt ? 'Sobre Nós' : 'About Us',
      aboutP1: pt
        ? 'Na Skyseed Clinical, acreditamos que cuidar da saúde não deveria ser complicado. Por isso, desenvolvemos suplementos com foco no que realmente importa: qualidade, segurança e resultados consistentes para quem busca mais bem-estar no dia a dia.'
        : 'At Skyseed Clinical, we believe taking care of your health should not be complicated. That is why we develop supplements focused on what truly matters: quality, safety, and consistent support for those seeking more well-being in daily life.',
      aboutP2: pt
        ? 'Cada fórmula é construída com critério, utilizando matérias-primas selecionadas e processos rigorosos de fabricação. Acreditamos que a confiança é conquistada nos detalhes, desde a escolha dos ingredientes até o cuidado presente em cada etapa da produção.'
        : 'Every formula is built with care, using selected raw materials and rigorous manufacturing processes. We believe trust is earned in the details—from choosing ingredients to the care present at every stage of production.',
      aboutP3: pt
        ? 'Também acreditamos que evoluir faz parte do processo. Acompanhamos constantemente os avanços da ciência e da tecnologia para aprimorar nossas fórmulas e oferecer soluções alinhadas às necessidades da vida moderna.'
        : 'We also believe that evolving is part of the process. We constantly follow advances in science and technology to improve our formulas and offer solutions aligned with the needs of modern life.',
      aboutP4: pt
        ? 'Mais do que criar suplementos, nosso objetivo é fazer parte da sua rotina de forma simples e transparente, ajudando você a construir hábitos que contribuam para uma vida com mais equilíbrio, disposição e qualidade. Porque uma vida melhor começa com escolhas melhores — e estamos aqui para fazer parte dessa jornada.'
        : 'More than creating supplements, our goal is to be part of your routine in a simple and transparent way, helping you build habits that contribute to a life with more balance, energy, and quality. Because a better life starts with better choices—and we are here to be part of that journey.',
      aboutImgAlt: pt
        ? 'Mulher em ambiente acolhedor, representando bem-estar e rotina saudável'
        : 'Woman in a welcoming environment, representing well-being and a healthy routine',
      aboutPillar1: pt ? 'Qualidade' : 'Quality',
      aboutPillar2: pt ? 'Confiança' : 'Trust',
      aboutPillar3: pt ? 'Evolução' : 'Evolution',
      aboutPillar4: pt ? 'Bem-Estar' : 'Well-Being',
      // Products
      productsLabel: pt ? 'Nossos Suplementos' : 'Our Supplements',
      productsH2: pt
        ? 'Suplementação pensada para o bem-estar do dia a dia'
        : 'Supplementation designed for everyday well-being',
      productsDesc: pt
        ? 'Na Skyseed Clinical, acreditamos que cuidar da saúde não deveria ser complicado. Desenvolvemos fórmulas com foco no que realmente importa: qualidade, segurança e resultados consistentes para quem busca mais equilíbrio na rotina.'
        : 'At Skyseed Clinical, we believe taking care of your health should not be complicated. We develop formulas focused on what truly matters: quality, safety, and consistent support for those seeking more balance in daily life.',
      p1name: pt ? 'Suplemento de Magnésio' : 'Magnesium Supplement',
      p1desc: pt
        ? 'Mineral essencial que participa de centenas de reações no organismo e pode apoiar equilíbrio muscular, nervoso e sensação de disposição no dia a dia.'
        : 'An essential mineral involved in hundreds of body reactions that may support muscular and nervous balance and daily energy.',
      p1price: pt ? 'Consulte disponibilidade' : 'Check availability',
      p2name: pt ? 'Apoio ao Sono e Relaxamento' : 'Sleep and Relaxation Support',
      p2desc: pt
        ? 'Fórmula desenvolvida para integrar hábitos de descanso, contribuindo para uma rotina noturna mais tranquila e consistente.'
        : 'A formula developed to integrate rest habits, contributing to a calmer and more consistent nighttime routine.',
      p2price: pt ? 'Consulte disponibilidade' : 'Check availability',
      p3name: pt ? 'Equilíbrio Digestivo' : 'Digestive Balance',
      p3desc: pt
        ? 'Suplementação voltada ao bem-estar intestinal, pensada para quem busca apoiar o equilíbrio do microbioma como parte de uma rotina saudável.'
        : 'Supplementation focused on intestinal well-being, designed for those seeking to support microbiome balance as part of a healthy routine.',
      p3price: pt ? 'Consulte disponibilidade' : 'Check availability',
      shopNow: pt ? 'Saiba Mais' : 'Learn More',
      // Science glass
      sgEyebrow: pt ? '• NOSSA ABORDAGEM' : '• OUR APPROACH',
      sgTitle: pt
        ? 'Cada fórmula é construída com critério, do ingrediente à produção.'
        : 'Every formula is built with care, from ingredient to production.',
      sgStatText: pt
        ? 'Acreditamos que a confiança é conquistada nos detalhes — desde a escolha das matérias-primas até o cuidado em cada etapa da fabricação.'
        : 'We believe trust is earned in the details—from selecting raw materials to care at every stage of manufacturing.',
      outerCapsule: pt ? 'SELEÇÃO DE INGREDIENTES' : 'INGREDIENT SELECTION',
      outerCapsuleDesc: pt
        ? 'Utilizamos matérias-primas selecionadas, priorizando qualidade e origem em cada componente das nossas fórmulas.'
        : 'We use selected raw materials, prioritizing quality and origin in every component of our formulas.',
      innerCapsule: pt ? 'PROCESSOS DE FABRICAÇÃO' : 'MANUFACTURING PROCESSES',
      innerCapsuleDesc: pt
        ? 'Processos rigorosos de fabricação garantem consistência e segurança em cada lote produzido.'
        : 'Rigorous manufacturing processes ensure consistency and safety in every batch produced.',
      // Benefits
      benefitsLabel: pt ? 'Nosso Compromisso' : 'Our Commitment',
      benefitsH2a: pt ? 'Bem-estar com' : 'Well-being with',
      benefitsH2b: pt ? 'transparência e critério' : 'transparency and care',
      tab1: pt ? 'Qualidade e Segurança' : 'Quality and Safety',
      tab1body: pt
        ? 'Desenvolvemos suplementos com foco no que realmente importa: qualidade, segurança e resultados consistentes para quem busca mais bem-estar no dia a dia.'
        : 'We develop supplements focused on what truly matters: quality, safety, and consistent support for those seeking more well-being in daily life.',
      tab2: pt ? 'Processos de Fabricação' : 'Manufacturing Processes',
      tab2body: pt
        ? 'Cada fórmula passa por processos rigorosos de fabricação. Acreditamos que a confiança é conquistada nos detalhes, em cada etapa da produção.'
        : 'Every formula goes through rigorous manufacturing processes. We believe trust is earned in the details, at every stage of production.',
      tab3: pt ? 'Ciência em Evolução' : 'Evolving Science',
      tab3body: pt
        ? 'Acompanhamos constantemente os avanços da ciência e da tecnologia para aprimorar nossas fórmulas e oferecer soluções alinhadas às necessidades da vida moderna.'
        : 'We constantly follow advances in science and technology to improve our formulas and offer solutions aligned with the needs of modern life.',
      tab4: pt ? 'Rotina Simples e Transparente' : 'Simple and Transparent Routine',
      tab4body: pt
        ? 'Mais do que criar suplementos, nosso objetivo é fazer parte da sua rotina de forma simples e transparente, ajudando você a construir hábitos saudáveis.'
        : 'More than creating supplements, our goal is to be part of your routine in a simple and transparent way, helping you build healthy habits.',
      tab5: pt ? 'Equilíbrio e Qualidade de Vida' : 'Balance and Quality of Life',
      tab5body: pt
        ? 'Estamos aqui para fazer parte da sua jornada rumo a uma vida com mais equilíbrio, disposição e qualidade — porque uma vida melhor começa com escolhas melhores.'
        : 'We are here to be part of your journey toward a life with more balance, energy, and quality—because a better life starts with better choices.',
      clinicalOutcomes: pt ? 'Nossos Compromissos' : 'Our Commitments',
      bar1: pt ? 'Seleção de Ingredientes' : 'Ingredient Selection',
      bar2: pt ? 'Cuidado na Produção' : 'Production Care',
      bar3: pt ? 'Acompanhamento Científico' : 'Scientific Monitoring',
      disclaimer: pt
        ? '*Estas afirmações não foram avaliadas pela ANVISA. Este produto não se destina a diagnosticar, tratar, curar ou prevenir qualquer doença.'
        : '*These statements have not been evaluated by the Food and Drug Administration. This product is not intended to diagnose, treat, cure, or prevent any disease.',
      // Learn / Blog
      learnLabel: pt ? 'Conteúdo Educativo' : 'Educational Content',
      learnH2: pt ? 'Conteúdo para o seu bem-estar' : 'Content for your well-being',
      learnDesc: pt
        ? 'Artigos sobre suplementação, hábitos saudáveis e qualidade de vida para apoiar suas escolhas no dia a dia.'
        : 'Articles on supplementation, healthy habits, and quality of life to support your daily choices.',
      readArticle: pt ? 'Ler artigo' : 'Read article',
      viewAllBlog: pt ? 'Ver todos os artigos →' : 'View all articles →',
      // Testimonials
      testiLabel: pt ? 'Na Rotina de Quem Confia' : 'In the Routine of Those Who Trust',
      testiH2a: pt ? 'Suplementação que se' : 'Supplementation that',
      testiH2b: pt ? 'integra ao dia a dia' : 'fits into daily life',
      testi1: pt
        ? '"Gosto da simplicidade de incluir o suplemento na minha rotina. A embalagem é clara e o processo é descomplicado."'
        : '"I like how simple it is to include the supplement in my routine. The packaging is clear and the process is straightforward."',
      testi1author: pt ? 'A. M. — Cliente' : 'A. M. — Customer',
      testi2: pt
        ? '"A transparência sobre os ingredientes me passou confiança desde o primeiro contato com a marca."'
        : '"Transparency about the ingredients gave me confidence from my first contact with the brand."',
      testi2author: pt ? 'R. S. — Cliente' : 'R. S. — Customer',
      testi3: pt
        ? '"Busco hábitos consistentes e a Skyseed Clinical se encaixa bem nessa proposta de cuidado contínuo."'
        : '"I look for consistent habits and Skyseed Clinical fits well with this idea of ongoing care."',
      testi3author: pt ? 'C. L. — Cliente' : 'C. L. — Customer',
      testi4: pt
        ? '"Aprecio o tom educativo da marca. Sinto que as informações são apresentadas de forma honesta e acessível."'
        : '"I appreciate the brand\'s educational tone. I feel the information is presented honestly and accessibly."',
      testi4author: pt ? 'M. T. — Cliente' : 'M. T. — Customer',
      testi5: pt
        ? '"Para mim, o mais importante é a facilidade de manter a suplementação como parte natural da rotina."'
        : '"For me, the most important thing is how easy it is to keep supplementation as a natural part of my routine."',
      testi5author: pt ? 'J. F. — Cliente' : 'J. F. — Customer',
      // Press → Pilares
      pressLabel: pt ? 'Nossos Pilares' : 'Our Pillars',
      press1: pt ? 'Qualidade' : 'Quality',
      press2: pt ? 'Segurança' : 'Safety',
      press3: pt ? 'Transparência' : 'Transparency',
      press4: pt ? 'Ciência' : 'Science',
      press5: pt ? 'Bem-estar' : 'Well-Being',
      press6: pt ? 'Confiança' : 'Trust',
      // CTA
      ctaLabel: pt ? 'Comece Hoje' : 'Start Today',
      ctaH2: pt
        ? 'Uma vida melhor começa com escolhas melhores'
        : 'A better life starts with better choices',
      ctaBtn: pt ? 'Conheça Nossos Suplementos' : 'Discover Our Supplements',
    };
  }

  ngAfterViewInit() {
    const fadeEls = document.querySelectorAll('.fade-up');
    if (typeof IntersectionObserver !== 'undefined') {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
      }, { threshold: 0.1 });
      fadeEls.forEach(el => observer.observe(el));
    }

    const tabs = document.querySelectorAll('.tab-item');
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
      });
    });

    const scroll = document.getElementById('testiScroll');
    const scrollLeftBtn = document.getElementById('scrollLeft');
    const scrollRightBtn = document.getElementById('scrollRight');
    if (scrollLeftBtn && scroll) scrollLeftBtn.addEventListener('click', () => scroll.scrollBy({ left: -344, behavior: 'smooth' }));
    if (scrollRightBtn && scroll) scrollRightBtn.addEventListener('click', () => scroll.scrollBy({ left: 344, behavior: 'smooth' }));

    const scrollIfFragment = (fragment: string | null) => {
      if (!fragment) return;
      requestAnimationFrame(() => this.scrollToFragment(fragment));
    };

    scrollIfFragment(this.route.snapshot.fragment);
    this.route.fragment.subscribe(scrollIfFragment);
  }

  private scrollToFragment(fragment: string) {
    const el = document.getElementById(fragment);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}
