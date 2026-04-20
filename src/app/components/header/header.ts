import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class HeaderComponent {
  navBoxShadow = 'none';
  mobileMenuOpen = false;

  @HostListener('window:scroll')
  onWindowScroll() {
    this.navBoxShadow = window.scrollY > 10 ? '0 2px 20px rgba(10,51,88,0.08)' : 'none';
  }

  toggleMenu() {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }
}
