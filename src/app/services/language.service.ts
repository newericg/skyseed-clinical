import { inject, Injectable, signal } from '@angular/core';
import { SeoService } from './seo.service';

export type Lang = 'en' | 'pt';

@Injectable({ providedIn: 'root' })
export class LanguageService {
  private seo = inject(SeoService);
  lang = signal<Lang>('pt');

  setLang(l: Lang) {
    this.lang.set(l);
    this.seo.setDocumentLang(l);
  }
}
