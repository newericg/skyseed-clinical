import { Component, HostListener, inject, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { filter, Subscription } from 'rxjs';
import { LanguageService, Lang } from '../../services/language.service';

export interface NavItem {
  id: string;
  label: Record<Lang, string>;
  route: string;
  fragment?: string;
}

@Component({
  selector: 'app-header',
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class HeaderComponent implements OnDestroy {
  langService = inject(LanguageService);
  private router = inject(Router);

  isScrolled = false;
  mobileMenuOpen = false;
  currentUrl = '';
  currentFragment = '';

  readonly navItems: NavItem[] = [
    { id: 'about', label: { pt: 'Sobre Nós', en: 'About Us' }, route: '/', fragment: 'about' },
    { id: 'lancamentos', label: { pt: 'Lançamentos', en: 'Launches' }, route: '/lancamentos' },
    { id: 'blog', label: { pt: 'Blog', en: 'Blog' }, route: '/blog' },
    { id: 'onde-comprar', label: { pt: 'Onde Comprar', en: 'Where to Buy' }, route: '/onde-comprar' },
    { id: 'contato', label: { pt: 'Fale Conosco', en: 'Contact Us' }, route: '/contato' },
  ];

  private routerSub: Subscription;

  constructor() {
    this.syncRouteState();
    this.routerSub = this.router.events
      .pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd))
      .subscribe(() => this.syncRouteState());
  }

  get lang() {
    return this.langService.lang();
  }

  setLang(l: Lang) {
    this.langService.setLang(l);
  }

  @HostListener('window:scroll')
  onWindowScroll() {
    this.isScrolled = window.scrollY > 40;
  }

  toggleMenu() {
    this.mobileMenuOpen = !this.mobileMenuOpen;
    document.body.style.overflow = this.mobileMenuOpen ? 'hidden' : '';
  }

  closeMenu() {
    if (this.mobileMenuOpen) {
      this.toggleMenu();
    }
  }

  isActive(item: NavItem): boolean {
    if (item.fragment) {
      return this.currentUrl === '/' && this.currentFragment === item.fragment;
    }
    if (item.route === '/blog') {
      return this.currentUrl === '/blog' || this.currentUrl.startsWith('/blog/');
    }
    return this.currentUrl === item.route;
  }

  ngOnDestroy() {
    this.routerSub.unsubscribe();
    document.body.style.overflow = '';
  }

  private syncRouteState() {
    const tree = this.router.parseUrl(this.router.url);
    const segments = tree.root.children['primary']?.segments ?? [];
    this.currentUrl = segments.length ? `/${segments.map((s) => s.path).join('/')}` : '/';
    this.currentFragment = tree.fragment ?? '';
  }
}
