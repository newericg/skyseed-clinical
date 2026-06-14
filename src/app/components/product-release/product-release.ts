import { isPlatformBrowser } from '@angular/common';
import { Component, HostListener, Input, OnDestroy, PLATFORM_ID, inject } from '@angular/core';
import { ProductRelease } from '../../data/products';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-product-release',
  imports: [],
  templateUrl: './product-release.html',
  styleUrl: './product-release.scss',
})
export class ProductReleaseComponent implements OnDestroy {
  @Input({ required: true }) product!: ProductRelease;
  @Input() buyLabel = 'Compre agora';

  private platformId = inject(PLATFORM_ID);
  langService = inject(LanguageService);

  imageModalOpen = false;

  get lang() {
    return this.langService.lang();
  }

  get expandImageLabel() {
    return this.lang === 'pt' ? 'Ampliar imagem do produto' : 'Enlarge product image';
  }

  get closeModalLabel() {
    return this.lang === 'pt' ? 'Fechar visualização' : 'Close preview';
  }

  openImageModal() {
    if (isPlatformBrowser(this.platformId)) {
      document.body.style.overflow = 'hidden';
    }
    this.imageModalOpen = true;
  }

  closeImageModal() {
    if (!this.imageModalOpen) return;
    this.imageModalOpen = false;
    if (isPlatformBrowser(this.platformId)) {
      document.body.style.overflow = '';
    }
  }

  @HostListener('document:keydown.escape')
  onEscape() {
    this.closeImageModal();
  }

  ngOnDestroy() {
    if (this.imageModalOpen && isPlatformBrowser(this.platformId)) {
      document.body.style.overflow = '';
    }
  }
}
