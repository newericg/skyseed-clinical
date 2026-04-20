import { Component, AfterViewInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class HomeComponent implements AfterViewInit {
  langService = inject(LanguageService);

  get lang() { return this.langService.lang(); }

  get t() {
    const pt = this.lang === 'pt';
    return {
      // Hero
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
      // Marquee
      m1: pt ? 'Estudado Clinicamente' : 'Clinically Studied',
      m2: pt ? '24 Cepas Probióticas' : '24 Probiotic Strains',
      m3: pt ? 'Sistema ViaCap®' : 'ViaCap® Delivery System',
      m4: pt ? 'Sem Refrigeração' : 'No Refrigeration Required',
      m5: pt ? 'Sem Alérgenos' : 'Allergen Free',
      m6: pt ? 'Fórmula Vegetal' : 'Plant-Based Formula',
      m7: pt ? 'Ensaios Clínicos Controlados' : 'Randomized Placebo-Controlled Trials',
      // Products
      productsLabel: pt ? 'Nossas Formulações' : 'Our Formulations',
      productsH2: pt ? 'Essenciais diários para nutrição e saúde digestiva' : 'Daily essentials for nutrition and digestive health',
      productsDesc: pt
        ? 'Sinbióticos e multivitamínicos formulados com precisão, projetados para trabalhar com sua biologia, apoiados por pesquisas científicas rigorosas.'
        : 'Precision-formulated synbiotics and multivitamins designed to work with your biology, backed by rigorous scientific research.',
      p1name: 'DS-01® Daily Synbiotic',
      p1desc: pt ? '24 cepas probióticas + prebiótico para saúde do corpo inteiro. Validado clinicamente para reduzir inchaço, gases e irregularidade.*' : '24 probiotic strains + prebiotic for whole-body health. Clinically validated to reduce bloating, gas, and irregularity.*',
      p1price: pt ? 'A partir de R$249/mês' : 'From $49.99 / month',
      p2name: pt ? 'Duo Essencial Diário' : 'Daily Essentials Duo',
      p2desc: pt ? 'DS-01® combinado com nosso multivitamínico diário para cobrir lacunas nutricionais e promover regularidade saudável.' : 'DS-01® paired with our daily multivitamin to cover nutrient gaps and promote healthy regularity.',
      p2price: pt ? 'A partir de R$399/mês' : 'From $79.99 / month',
      p3name: pt ? 'PDS-08™ Sinbiótico Pediátrico' : 'PDS-08™ Pediatric Synbiotic',
      p3desc: pt ? 'Formulado para crianças a partir de 3 anos, apoiando imunidade intestinal, digestão saudável e desenvolvimento do microbioma.*' : 'Formulated for children 3+, supporting gut immunity, healthy digestion, and microbiome development.*',
      p3price: pt ? 'A partir de R$199/mês' : 'From $39.99 / month',
      shopNow: pt ? 'Comprar Agora' : 'Shop Now',
      // Science glass
      sgEyebrow: '• VIACAP® TECHNOLOGY',
      sgTitle: pt ? 'A maioria dos probióticos não sobrevive à digestão — DS-01® sobrevive.' : "Most probiotics don't survive digestion—DS-01® does.",
      sgStatText: pt ? 'Aumenta bactérias saudáveis' : 'Increases healthy bacteria',
      outerCapsule: pt ? 'CÁPSULA EXTERNA' : 'OUTER CAPSULE',
      outerCapsuleDesc: pt ? 'Protege os probióticos do ácido estomacal no trato digestivo, enquanto fornece prebióticos para estimular o crescimento de bactérias benéficas.' : 'Shields probiotics from stomach acid in the digestive tract, while delivering prebiotics to stimulate the growth of beneficial bacteria.',
      innerCapsule: pt ? 'CÁPSULA INTERNA' : 'INNER CAPSULE',
      innerCapsuleDesc: pt ? 'Entrega 24 cepas vivas de probióticos ao cólon, onde são mais necessárias.' : "Delivers 24 live strains of probiotics to the colon, where they're needed most.",
      // Benefits
      benefitsLabel: pt ? 'Benefícios à Saúde' : 'Health Benefits',
      benefitsH2a: pt ? 'Benefícios dentro e' : 'Benefits in and',
      benefitsH2b: pt ? 'além do intestino' : 'beyond the gut',
      tab1: pt ? 'Saúde Digestiva' : 'Digestive Health',
      tab1body: pt ? 'Reduz inchaço, gases e irregularidade em adultos saudáveis. O DS-01® foi validado no maior ensaio clínico de probióticos avaliando inchaço.*' : 'Reduces bloating, gas, and irregularity in healthy adults. DS-01® has been validated in the largest probiotic clinical trial evaluating bloating.*',
      tab2: pt ? 'Imunidade Intestinal' : 'Gut Immunity',
      tab2body: pt ? 'Fortalece a barreira intestinal, reforça a imunidade gastrointestinal e apoia um sistema imunológico saudável.*' : 'Fortifies the gut barrier, reinforces gastrointestinal immunity, and supports a healthy immune system from within.*',
      tab3: pt ? 'Saúde Dermatológica' : 'Dermatological Health',
      tab3body: pt ? 'Reforça o eixo intestino-pele, apoiando a saúde da pele, luminosidade e reduzindo a ocorrência de certas condições de pele.*' : 'Reinforces the gut-skin axis supporting skin health, radiance, and reducing the occurrence of certain skin conditions.*',
      tab4: pt ? 'Saúde Cardiovascular' : 'Cardiovascular Health',
      tab4body: pt ? 'Cepas probióticas específicas do DS-01® são clinicamente estudadas para promover função cardiovascular saudável e equilíbrio do colesterol.*' : 'Specific probiotic strains in DS-01® are clinically studied to promote healthy cardiovascular function and cholesterol balance.*',
      tab5: pt ? 'Síntese de Micronutrientes' : 'Micronutrient Synthesis',
      tab5body: pt ? 'Promove a biossíntese de micronutrientes essenciais, incluindo folato, vitamina B12 e ácidos graxos de cadeia curta.*' : 'Promotes the biosynthesis of key micronutrients including folate, vitamin B12, and short-chain fatty acids.*',
      clinicalOutcomes: pt ? 'Resultados Clínicos' : 'Clinical Outcomes',
      bar1: pt ? 'Redução de Inchaço' : 'Bloating Reduction',
      bar2: pt ? 'Melhora de Gases' : 'Gas Improvement',
      bar3: pt ? 'Suporte à Regularidade' : 'Regularity Support',
      disclaimer: pt
        ? '*Estas afirmações não foram avaliadas pela ANVISA. Este produto não se destina a diagnosticar, tratar, curar ou prevenir qualquer doença.'
        : '*These statements have not been evaluated by the Food and Drug Administration. This product is not intended to diagnose, treat, cure, or prevent any disease.',
      // Testimonials
      testiLabel: pt ? 'O Que as Pessoas Estão Dizendo' : 'What People Are Saying',
      testiH2a: pt ? 'Mais de 1 milhão de' : 'Over 1 million',
      testiH2b: pt ? 'assinantes no mundo' : 'subscribers worldwide',
      testi1: pt
        ? '"Experimentei inúmeros probióticos ao longo dos anos. Nada fez a diferença que a Skyseed fez. Minha digestão se transformou completamente em dois meses."'
        : '"I\'ve tried countless probiotics over the years. Nothing has made the difference that Skyseed has. My digestion has completely transformed in two months."',
      testi1author: pt ? 'Sarah M. — Assinante Verificada' : 'Sarah M. — Verified Subscriber',
      testi2: pt
        ? '"Como gastroenterologista, fico impressionado com o rigor clínico por trás do DS-01®. Eu o recomendo a pacientes que buscam suporte probiótico baseado em evidências."'
        : '"As a gastroenterologist, I\'m impressed by the clinical rigor behind DS-01®. I recommend it to patients looking for evidence-based probiotic support."',
      testi2author: pt ? 'Dr. James K. — Gastroenterologista' : 'Dr. James K. — Gastroenterologist',
      testi3: pt
        ? '"O inchaço com que eu vivia há anos praticamente desapareceu. Não esperava que algo funcionasse tão bem, mas aqui estamos. Genuinamente transformador."'
        : '"The bloating I\'d lived with for years is basically gone. I didn\'t expect something to work this well, but here we are. Genuinely life-changing."',
      testi3author: pt ? 'Priya L. — Assinante Verificada' : 'Priya L. — Verified Subscriber',
      testi4: pt
        ? '"Adoro que não precisa de refrigeração e a embalagem é linda. Mas o mais importante — meu intestino está melhor do que nos últimos anos."'
        : '"I love that it doesn\'t need refrigeration and the packaging is beautiful. But most importantly — my gut feels better than it has in years."',
      testi4author: pt ? 'Marcus T. — Assinante Verificado' : 'Marcus T. — Verified Subscriber',
      testi5: pt
        ? '"A ciência por trás da Skyseed foi o que me convenceu. Saber que passou por ensaios clínicos reais me dá uma confiança que outros suplementos simplesmente não têm."'
        : '"The science behind Skyseed is what sold me. Knowing it\'s been through actual clinical trials gives me confidence that other supplements simply don\'t."',
      testi5author: pt ? 'Elena R. — Assinante Verificada' : 'Elena R. — Verified Subscriber',
      // Press
      pressLabel: pt ? 'Destaque na Mídia' : 'As Featured In',
      // CTA
      ctaLabel: pt ? 'Comece Hoje' : 'Start Today',
      ctaH2: pt
        ? 'Seu corpo não é só seu — ele abriga 38 trilhões de micróbios'
        : "Your body isn't yours alone — it's home to 38 trillion microbes",
      ctaBtn: pt ? 'Adquira DS-01® Agora' : 'Get DS-01® Now',
    };
  }

  ngAfterViewInit() {
    // Scroll reveal
    const fadeEls = document.querySelectorAll('.fade-up');
    if (typeof IntersectionObserver !== 'undefined') {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
      }, { threshold: 0.1 });
      fadeEls.forEach(el => observer.observe(el));
    }

    // Tabs logic
    const tabs = document.querySelectorAll('.tab-item');
    const bars = [
      document.getElementById('b1'),
      document.getElementById('b2'),
      document.getElementById('b3')
    ];
    const barVals = [
      document.getElementById('b1v'),
      document.getElementById('b2v'),
      document.getElementById('b3v')
    ];

    const updateBars = (values: number[]) => {
      bars.forEach((bar, i) => {
        if (!bar) return;
        bar.style.width = '0';
        bar.style.transition = 'none';
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            bar.style.transition = 'width 1.2s cubic-bezier(.4,0,.2,1)';
            bar.style.width = values[i] + '%';
            if (barVals[i]) barVals[i]!.textContent = values[i] + '%';
          });
        });
      });
    };

    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        const dataBars = (tab as HTMLElement).dataset['bars'];
        if (dataBars) updateBars(JSON.parse(dataBars));
      });
    });

    // Testimonial scroll
    const scroll = document.getElementById('testiScroll');
    const scrollLeftBtn = document.getElementById('scrollLeft');
    const scrollRightBtn = document.getElementById('scrollRight');
    if (scrollLeftBtn && scroll) scrollLeftBtn.addEventListener('click', () => scroll.scrollBy({ left: -344, behavior: 'smooth' }));
    if (scrollRightBtn && scroll) scrollRightBtn.addEventListener('click', () => scroll.scrollBy({ left: 344, behavior: 'smooth' }));

    setTimeout(() => updateBars([85, 72, 68]), 800);
  }
}
