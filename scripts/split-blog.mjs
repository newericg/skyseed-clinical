import fs from 'fs';

const src = fs.readFileSync('src/app/data/blog-articles.ts', 'utf8');
const slugs = ['magnesio-equilibrio-organismo', 'higiene-do-sono', 'microbioma-intestinal'];

let content = `import { Lang } from '../services/language.service';

export interface BlogSection {
  heading?: string;
  paragraphs: string[];
}

export type ArticleSections = Record<Lang, BlogSection[]>;

export const ARTICLE_SECTIONS: Record<string, ArticleSections> = {
`;

for (const slug of slugs) {
  const marker = `slug: '${slug}'`;
  const idx = src.indexOf(marker);
  const sectionsIdx = src.indexOf('sections: {', idx);
  let depth = 0;
  let started = false;
  let end = sectionsIdx;
  for (let i = sectionsIdx + 'sections: '.length; i < src.length; i++) {
    const ch = src[i];
    if (ch === '{') {
      depth++;
      started = true;
    } else if (ch === '}') {
      depth--;
      if (started && depth === 0) {
        end = i + 1;
        break;
      }
    }
  }
  const sections = src.slice(sectionsIdx + 'sections: '.length, end);
  content += `  '${slug}': ${sections},\n`;
}

content += '};\n';
fs.writeFileSync('src/app/data/blog-articles-content.ts', content);
console.log('Written blog-articles-content.ts');
