import { Lang } from '../services/language.service';

export interface BlogSection {
  heading?: string;
  paragraphs: string[];
}

export type ArticleSections = Record<Lang, BlogSection[]>;

export const ARTICLE_SECTIONS: Record<string, ArticleSections> = {
  'magnesio-equilibrio-organismo': {
      pt: [
        {
          heading: 'O que é o magnésio e por que ele importa',
          paragraphs: [
            'O magnésio é um mineral essencial para o funcionamento do corpo humano e participa de mais de 300 reações bioquímicas. Ele está envolvido em processos fundamentais como produção de energia, funcionamento muscular e equilíbrio do sistema nervoso.',
            'Mesmo sendo tão importante, muitas pessoas não consomem quantidades adequadas de magnésio na alimentação diária. Isso pode acontecer devido à baixa qualidade nutricional dos alimentos modernos e ao alto consumo de ultraprocessados.',
          ],
        },
        {
          heading: 'Sinais no dia a dia',
          paragraphs: [
            'Quando os níveis de magnésio estão baixos, o corpo pode dar sinais sutis. Entre eles estão cansaço frequente, dificuldade para dormir, irritabilidade e até espasmos musculares.',
          ],
        },
        {
          heading: 'Magnésio, estresse e equilíbrio',
          paragraphs: [
            'Esse mineral também tem um papel importante no controle do estresse. Ele ajuda a regular a atividade do sistema nervoso, contribuindo para uma sensação maior de calma e equilíbrio.',
            'Em situações de estresse constante, o organismo tende a gastar mais magnésio, o que pode agravar ainda mais sintomas como ansiedade e tensão muscular.',
          ],
        },
        {
          heading: 'Magnésio e qualidade do sono',
          paragraphs: [
            'Outro ponto importante é a relação entre magnésio e sono. Ele participa de mecanismos ligados ao relaxamento e à produção de substâncias envolvidas na qualidade do descanso.',
            'Com níveis adequados, muitas pessoas percebem melhora na facilidade para dormir e na profundidade do sono, o que impacta diretamente na disposição diária.',
          ],
        },
        {
          heading: 'Alimentação e suplementação',
          paragraphs: [
            'O magnésio pode ser encontrado em alimentos como folhas verdes escuras, sementes, oleaginosas, leguminosas e cacau. Ainda assim, nem sempre a alimentação cobre toda a necessidade do organismo.',
            'Por isso, em alguns casos, a suplementação pode ser considerada como uma forma de apoio para manter níveis adequados desse mineral no corpo.',
            'Entender a importância do magnésio é um passo importante para buscar mais equilíbrio no organismo, já que ele atua como um verdadeiro regulador de funções essenciais da saúde.',
          ],
        },
      ],
      en: [
        {
          heading: 'What magnesium is and why it matters',
          paragraphs: [
            'Magnesium is an essential mineral for human body function and participates in more than 300 biochemical reactions. It is involved in fundamental processes such as energy production, muscle function, and nervous system balance.',
            'Despite its importance, many people do not consume adequate amounts of magnesium in their daily diet. This can happen due to the lower nutritional quality of modern foods and high consumption of ultra-processed products.',
          ],
        },
        {
          heading: 'Signs in daily life',
          paragraphs: [
            'When magnesium levels are low, the body may show subtle signs. These include frequent tiredness, difficulty sleeping, irritability, and even muscle spasms.',
          ],
        },
        {
          heading: 'Magnesium, stress, and balance',
          paragraphs: [
            'This mineral also plays an important role in stress management. It helps regulate nervous system activity, contributing to a greater sense of calm and balance.',
            'In situations of constant stress, the body tends to use more magnesium, which can further aggravate symptoms such as anxiety and muscle tension.',
          ],
        },
        {
          heading: 'Magnesium and sleep quality',
          paragraphs: [
            'Another important point is the relationship between magnesium and sleep. It participates in mechanisms linked to relaxation and the production of substances involved in rest quality.',
            'With adequate levels, many people notice improvement in ease of falling asleep and sleep depth, which directly impacts daily energy.',
          ],
        },
        {
          heading: 'Diet and supplementation',
          paragraphs: [
            'Magnesium can be found in foods such as dark leafy greens, seeds, nuts, legumes, and cocoa. Still, diet does not always cover the body\'s full needs.',
            'Therefore, in some cases, supplementation may be considered as a form of support to maintain adequate levels of this mineral in the body.',
            'Understanding the importance of magnesium is an important step toward seeking more balance in the body, as it acts as a true regulator of essential health functions.',
          ],
        },
      ],
    },
  'higiene-do-sono': {
      pt: [
        {
          heading: 'O que é higiene do sono',
          paragraphs: [
            'A higiene do sono é um conjunto de hábitos e práticas que ajudam o corpo e a mente a dormir melhor. Ela influencia diretamente a facilidade para adormecer e a qualidade do descanso ao longo da noite.',
            'Mais do que dormir muitas horas, o que importa é a qualidade do sono. Um sono bem estruturado impacta energia, humor, concentração e recuperação física.',
          ],
        },
        {
          heading: 'Horários e relógio biológico',
          paragraphs: [
            'Manter horários regulares para dormir e acordar ajuda a regular o relógio biológico. Com o tempo, o corpo passa a reconhecer esses padrões e facilita o processo de sono.',
          ],
        },
        {
          heading: 'Telas, luz e ambiente',
          paragraphs: [
            'A exposição à luz artificial, especialmente de telas, pode atrapalhar a produção de melatonina. Reduzir o uso de celular e computador à noite contribui para um adormecer mais natural.',
            'O ambiente do quarto também é fundamental. Um espaço escuro, silencioso e com temperatura agradável favorece o relaxamento e a profundidade do sono.',
          ],
        },
        {
          heading: 'Estimulantes e rotina de desaceleração',
          paragraphs: [
            'Evitar estimulantes como cafeína no fim do dia pode fazer diferença significativa. Essas substâncias podem manter o sistema nervoso mais ativo por várias horas.',
            'Criar uma rotina de desaceleração antes de dormir ajuda o corpo a entender que é hora de descansar. Atividades leves podem facilitar essa transição.',
          ],
        },
        {
          heading: 'Consistência ao longo do tempo',
          paragraphs: [
            'Com o tempo, esses hábitos fazem o organismo responder melhor aos sinais de sono, tornando o descanso mais eficiente e constante.',
            'A melhora na higiene do sono não acontece de um dia para o outro, mas de forma progressiva. A consistência é o que gera resultado real.',
            'No geral, pequenas mudanças na rotina podem ter um grande impacto na qualidade do sono e, consequentemente, na saúde e no desempenho diário.',
          ],
        },
      ],
      en: [
        {
          heading: 'What sleep hygiene is',
          paragraphs: [
            'Sleep hygiene is a set of habits and practices that help the body and mind sleep better. It directly influences ease of falling asleep and the quality of rest throughout the night.',
            'More than sleeping many hours, what matters is sleep quality. Well-structured sleep impacts energy, mood, concentration, and physical recovery.',
          ],
        },
        {
          heading: 'Schedules and the biological clock',
          paragraphs: [
            'Maintaining regular times for sleeping and waking helps regulate the biological clock. Over time, the body learns to recognize these patterns and sleep becomes easier.',
          ],
        },
        {
          heading: 'Screens, light, and environment',
          paragraphs: [
            'Exposure to artificial light, especially from screens, can interfere with melatonin production. Reducing phone and computer use at night contributes to more natural falling asleep.',
            'The bedroom environment is also fundamental. A dark, quiet space with a comfortable temperature favors relaxation and sleep depth.',
          ],
        },
        {
          heading: 'Stimulants and wind-down routine',
          paragraphs: [
            'Avoiding stimulants such as caffeine late in the day can make a significant difference. These substances can keep the nervous system more active for several hours.',
            'Creating a wind-down routine before bed helps the body understand it is time to rest. Light activities can facilitate this transition.',
          ],
        },
        {
          heading: 'Consistency over time',
          paragraphs: [
            'Over time, these habits help the body respond better to sleep signals, making rest more efficient and consistent.',
            'Improvement in sleep hygiene does not happen overnight, but progressively. Consistency is what generates real results.',
            'Overall, small changes in routine can have a big impact on sleep quality and, consequently, on health and daily performance.',
          ],
        },
      ],
    },
  'microbioma-intestinal': {
      pt: [
        {
          heading: 'Um ecossistema dentro do corpo',
          paragraphs: [
            'O microbioma intestinal é um conjunto de trilhões de microrganismos que vivem no intestino humano. Ele forma um verdadeiro ecossistema interno que influencia diversas funções do corpo.',
            'Esse sistema inclui bactérias, fungos e outros microrganismos que trabalham em equilíbrio. Apesar de invisível, ele é essencial para a manutenção da saúde.',
          ],
        },
        {
          heading: 'Digestão e metabolismo',
          paragraphs: [
            'O microbioma atua diretamente na digestão dos alimentos. Ele ajuda a quebrar nutrientes e facilita a absorção de vitaminas e minerais importantes.',
            'Além da digestão, ele também tem papel na produção de algumas vitaminas e na regulação de processos metabólicos do organismo.',
          ],
        },
        {
          heading: 'Imunidade e defesas do corpo',
          paragraphs: [
            'Grande parte do sistema imunológico está ligada ao intestino. Por isso, o equilíbrio do microbioma influencia diretamente as defesas do corpo.',
            'Quando há desequilíbrio, o organismo pode se tornar mais suscetível a inflamações e desconfortos. Já um microbioma saudável contribui para maior resistência.',
          ],
        },
        {
          heading: 'Conexão entre intestino e cérebro',
          paragraphs: [
            'Existe também uma forte conexão entre o intestino e o cérebro. Essa comunicação pode influenciar humor, níveis de estresse e bem-estar mental.',
          ],
        },
        {
          heading: 'Como cuidar do microbioma',
          paragraphs: [
            'Fatores como má alimentação, estresse e uso frequente de antibióticos podem prejudicar o equilíbrio desse ecossistema interno.',
            'Por outro lado, uma alimentação rica em fibras, variedade de alimentos e hábitos saudáveis ajudam a manter o microbioma equilibrado.',
            'Cuidar do microbioma intestinal é uma forma de cuidar da saúde como um todo, já que ele influencia várias funções essenciais do organismo.',
          ],
        },
      ],
      en: [
        {
          heading: 'An ecosystem within the body',
          paragraphs: [
            'The gut microbiome is a collection of trillions of microorganisms that live in the human intestine. It forms a true internal ecosystem that influences various body functions.',
            'This system includes bacteria, fungi, and other microorganisms that work in balance. Although invisible, it is essential for maintaining health.',
          ],
        },
        {
          heading: 'Digestion and metabolism',
          paragraphs: [
            'The microbiome acts directly in food digestion. It helps break down nutrients and facilitates absorption of important vitamins and minerals.',
            'Beyond digestion, it also plays a role in producing certain vitamins and regulating metabolic processes in the body.',
          ],
        },
        {
          heading: 'Immunity and body defenses',
          paragraphs: [
            'Much of the immune system is linked to the gut. Therefore, microbiome balance directly influences the body\'s defenses.',
            'When there is imbalance, the body may become more susceptible to inflammation and discomfort. A healthy microbiome contributes to greater resilience.',
          ],
        },
        {
          heading: 'The gut-brain connection',
          paragraphs: [
            'There is also a strong connection between the gut and the brain. This communication can influence mood, stress levels, and mental well-being.',
          ],
        },
        {
          heading: 'How to care for the microbiome',
          paragraphs: [
            'Factors such as poor diet, stress, and frequent antibiotic use can harm the balance of this internal ecosystem.',
            'On the other hand, a fiber-rich diet, food variety, and healthy habits help keep the microbiome balanced.',
            'Caring for the gut microbiome is a way to care for health as a whole, since it influences several essential body functions.',
          ],
        },
      ],
    },
};
