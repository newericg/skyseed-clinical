import { isPlatformBrowser } from '@angular/common';
import {
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
  PLATFORM_ID,
  ViewChild,
  inject,
} from '@angular/core';
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
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class HeaderComponent implements OnDestroy {
  langService = inject(LanguageService);
  private router = inject(Router);
  private platformId = inject(PLATFORM_ID);

  @ViewChild('mobileNav') mobileNavRef?: ElementRef<HTMLElement>;
  @ViewChild('hamburgerBtn') hamburgerRef?: ElementRef<HTMLButtonElement>;

  isScrolled = false;
  mobileMenuOpen = false;
  currentUrl = '';
  currentFragment = '';
  private scrollTicking = false;

  readonly navItems: NavItem[] = [
    { id: 'home', label: { pt: 'Página inicial', en: 'Home' }, route: '/' },
    { id: 'about', label: { pt: 'Sobre Nós', en: 'About Us' }, route: '/', fragment: 'about' },
    { id: 'lancamentos', label: { pt: 'Lançamentos', en: 'Launches' }, route: '/lancamentos' },
    { id: 'blog', label: { pt: 'Blog', en: 'Blog' }, route: '/blog' },
  ];

  private routerSub: Subscription;
  private previousFocus: HTMLElement | null = null;

  constructor() {
    this.syncRouteState();
    this.routerSub = this.router.events
      .pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd))
      .subscribe(() => this.syncRouteState());
  }

  get lang() {
    return this.langService.lang();
  }

  get menuLabel() {
    return this.lang === 'pt' ? 'Menu' : 'Menu';
  }

  get closeMenuLabel() {
    return this.lang === 'pt' ? 'Fechar menu' : 'Close menu';
  }

  setLang(l: Lang) {
    this.langService.setLang(l);
  }

  @HostListener('window:scroll')
  onWindowScroll() {
    if (this.scrollTicking) return;
    this.scrollTicking = true;
    requestAnimationFrame(() => {
      this.isScrolled = window.scrollY > 40;
      this.scrollTicking = false;
    });
  }

  @HostListener('document:keydown', ['$event'])
  onDocumentKeydown(event: KeyboardEvent) {
    if (event.key === 'Escape' && this.mobileMenuOpen) {
      this.toggleMenu();
    }
  }

  toggleMenu() {
    if (this.mobileMenuOpen) {
      this.closeMenu();
      return;
    }

    if (isPlatformBrowser(this.platformId)) {
      this.previousFocus = document.activeElement as HTMLElement;
      document.body.style.overflow = 'hidden';
    }
    this.mobileMenuOpen = true;

    if (isPlatformBrowser(this.platformId)) {
      requestAnimationFrame(() => {
        const firstLink = this.mobileNavRef?.nativeElement.querySelector<HTMLElement>(
          'a, button',
        );
        firstLink?.focus();
      });
    }
  }

  closeMenu() {
    if (!this.mobileMenuOpen) return;

    this.mobileMenuOpen = false;
    if (isPlatformBrowser(this.platformId)) {
      document.body.style.overflow = '';
      this.previousFocus?.focus();
    }
    this.previousFocus = null;
  }

  isActive(item: NavItem): boolean {
    if (item.route === '/' && !item.fragment) {
      return this.currentUrl === '/' && !this.currentFragment;
    }
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
    if (isPlatformBrowser(this.platformId)) {
      document.body.style.overflow = '';
    }
  }

  private syncRouteState() {
    const tree = this.router.parseUrl(this.router.url);
    const segments = tree.root.children['primary']?.segments ?? [];
    this.currentUrl = segments.length ? `/${segments.map((s) => s.path).join('/')}` : '/';
    this.currentFragment = tree.fragment ?? '';
  }
}
