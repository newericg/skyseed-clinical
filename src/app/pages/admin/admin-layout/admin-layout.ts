import { Component, inject, signal } from '@angular/core';
import {
  NavigationEnd,
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';
import { filter } from 'rxjs';
import { AdminAuthService } from '../../../services/admin-auth.service';

interface AdminNavItem {
  label: string;
  route: string;
  exact?: boolean;
  icon: 'dashboard' | 'articles' | 'users';
}

@Component({
  selector: 'app-admin-layout',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './admin-layout.html',
  styleUrl: './admin-layout.scss',
})
export class AdminLayoutComponent {
  private auth = inject(AdminAuthService);
  private router = inject(Router);

  readonly sidebarOpen = signal(false);
  readonly pageTitle = signal('Painel');

  readonly navItems: AdminNavItem[] = [
    { label: 'Dashboard', route: '/admin/dashboard', exact: true, icon: 'dashboard' },
    { label: 'Artigos', route: '/admin/articles', icon: 'articles' },
    { label: 'Usuários', route: '/admin/users', icon: 'users' },
  ];

  readonly userEmail = () => this.auth.user()?.email ?? '';

  constructor() {
    if (!this.auth.checked()) {
      this.auth.checkSession().subscribe();
    }

    this.updatePageTitle();
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => this.updatePageTitle());
  }

  private updatePageTitle(): void {
    let title = 'Painel';
    let route = this.router.routerState.root;

    while (route) {
      const routeTitle = route.snapshot?.data?.['adminTitle'];
      if (typeof routeTitle === 'string') {
        title = routeTitle;
      }
      if (!route.firstChild) break;
      route = route.firstChild;
    }

    this.pageTitle.set(title);
  }

  toggleSidebar(): void {
    this.sidebarOpen.update((open) => !open);
  }

  closeSidebar(): void {
    this.sidebarOpen.set(false);
  }

  logout(): void {
    this.auth.logout().subscribe(() => {
      window.location.href = '/admin/login';
    });
  }
}
