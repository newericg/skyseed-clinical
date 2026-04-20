import { Injectable, signal } from '@angular/core';

export type Lang = 'en' | 'pt';

@Injectable({ providedIn: 'root' })
export class LanguageService {
  lang = signal<Lang>('pt');

  setLang(l: Lang) {
    this.lang.set(l);
  }
}
