import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  Injector,
  Input,
  OnDestroy,
  PLATFORM_ID,
  afterNextRender,
  computed,
  effect,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { ProductRelease } from '../../data/products';
import { LanguageService } from '../../services/language.service';

const CAROUSEL_THRESHOLD = 3;
const THUMB_GAP_PX = 10;
const DESKTOP_VISIBLE = 3;
const TABLET_VISIBLE = 2;
const TABLET_BREAKPOINT = 900;
const MOBILE_VISIBLE = 2;

@Component({
  selector: 'app-product-release',
  imports: [],
  templateUrl: './product-release.html',
  styleUrl: './product-release.scss',
})
export class ProductReleaseComponent implements AfterViewInit, OnDestroy {
  @Input({ required: true }) product!: ProductRelease;
  @Input() buyLabel = 'COMPRE AGORA (Clique no link abaixo)';

  private platformId = inject(PLATFORM_ID);
  private document = inject(DOCUMENT);
  private injector = inject(Injector);
  langService = inject(LanguageService);

  private thumbViewport = viewChild<ElementRef<HTMLElement>>('thumbViewport');
  private modalRoot = viewChild<ElementRef<HTMLElement>>('modalRoot');

  activeIndex = signal(0);
  carouselOffset = signal(0);
  visibleCount = signal(DESKTOP_VISIBLE);
  thumbWidthPx = signal(0);
  imageTransitioning = signal(false);

  imageModalOpen = false;

  readonly isCarousel = computed(() => this.product.images.length > CAROUSEL_THRESHOLD);

  readonly activeImage = computed(() => this.product.images[this.activeIndex()]);

  readonly canScrollPrev = computed(() => this.isCarousel() && this.carouselOffset() > 0);

  readonly canScrollNext = computed(
    () =>
      this.isCarousel() &&
      this.carouselOffset() + this.visibleCount() < this.product.images.length,
  );

  readonly trackTransform = computed(() => {
    if (!this.isCarousel()) return 'none';

    const thumbWidth = this.thumbWidthPx();
    if (thumbWidth <= 0) return 'none';

    const shift = this.carouselOffset() * (thumbWidth + THUMB_GAP_PX);
    return `translateX(${-shift}px)`;
  });

  private transitionTimer: ReturnType<typeof setTimeout> | null = null;
  private resizeObserver: ResizeObserver | null = null;
  private touchStartX = 0;

  private readonly preloadEffect = effect(() => {
    if (!isPlatformBrowser(this.platformId)) return;

    const index = this.activeIndex();
    const images = this.product.images;

    for (const offset of [-1, 1, 2]) {
      const target = index + offset;
      if (target >= 0 && target < images.length) {
        const img = new Image();
        img.src = images[target].src;
      }
    }
  });

  get lang() {
    return this.langService.lang();
  }

  get expandImageLabel() {
    return this.lang === 'pt' ? 'Ampliar imagem do produto' : 'Enlarge product image';
  }

  get closeModalLabel() {
    return this.lang === 'pt' ? 'Fechar visualização' : 'Close preview';
  }

  get galleryLabel() {
    return this.lang === 'pt' ? 'Galeria de imagens do produto' : 'Product image gallery';
  }

  get prevThumbsLabel() {
    return this.lang === 'pt' ? 'Miniaturas anteriores' : 'Previous thumbnails';
  }

  get nextThumbsLabel() {
    return this.lang === 'pt' ? 'Próximas miniaturas' : 'Next thumbnails';
  }

  ngAfterViewInit() {
    if (!isPlatformBrowser(this.platformId)) return;

    const viewport = this.thumbViewport()?.nativeElement;
    if (!viewport) return;

    this.updateLayout();

    this.resizeObserver = new ResizeObserver(() => this.updateLayout());
    this.resizeObserver.observe(viewport);
  }

  ngOnDestroy() {
    if (this.transitionTimer) clearTimeout(this.transitionTimer);
    this.resizeObserver?.disconnect();

    if (this.imageModalOpen && isPlatformBrowser(this.platformId)) {
      this.document.body.style.overflow = '';
    }
  }

  onThumbHover(index: number) {
    if (!isPlatformBrowser(this.platformId)) return;
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    this.previewImage(index);
  }

  selectImage(index: number) {
    this.previewImage(index);
    this.syncCarouselWindow(index);
  }

  scrollThumbs(direction: -1 | 1) {
    if (!this.isCarousel()) return;

    const maxOffset = Math.max(0, this.product.images.length - this.visibleCount());
    this.carouselOffset.update((offset) =>
      Math.min(maxOffset, Math.max(0, offset + direction)),
    );
  }

  onThumbTouchStart(event: TouchEvent) {
    this.touchStartX = event.touches[0]?.clientX ?? 0;
  }

  onThumbTouchEnd(event: TouchEvent) {
    if (!this.isCarousel()) return;

    const endX = event.changedTouches[0]?.clientX ?? 0;
    const delta = endX - this.touchStartX;

    if (Math.abs(delta) < 40) return;

    this.scrollThumbs(delta < 0 ? 1 : -1);
  }

  onThumbImageLoad() {
    this.updateLayout();
  }

  @HostListener('window:resize')
  onResize() {
    this.updateLayout();
  }

  @HostListener('keydown', ['$event'])
  onGalleryKeydown(event: KeyboardEvent) {
    if (this.product.images.length <= 1) return;

    const target = event.target as HTMLElement | null;
    if (!target?.closest('.product-release-gallery')) return;

    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      const next = Math.max(0, this.activeIndex() - 1);
      this.selectImage(next);
    } else if (event.key === 'ArrowRight') {
      event.preventDefault();
      const next = Math.min(this.product.images.length - 1, this.activeIndex() + 1);
      this.selectImage(next);
    }
  }

  @HostListener('document:keydown.escape')
  onEscape() {
    this.closeImageModal();
  }

  openImageModal() {
    if (isPlatformBrowser(this.platformId)) {
      this.document.body.style.overflow = 'hidden';
    }
    this.imageModalOpen = true;
    afterNextRender(() => this.attachModalToBody(), { injector: this.injector });
  }

  closeImageModal() {
    if (!this.imageModalOpen) return;
    this.imageModalOpen = false;
    if (isPlatformBrowser(this.platformId)) {
      this.document.body.style.overflow = '';
    }
  }

  private attachModalToBody() {
    const root = this.modalRoot()?.nativeElement;
    if (root && root.parentElement !== this.document.body) {
      this.document.body.appendChild(root);
    }
  }

  private previewImage(index: number) {
    if (index === this.activeIndex()) return;

    this.imageTransitioning.set(true);
    if (this.transitionTimer) clearTimeout(this.transitionTimer);

    this.activeIndex.set(index);

    this.transitionTimer = setTimeout(() => {
      this.imageTransitioning.set(false);
      this.transitionTimer = null;
    }, 350);
  }

  private syncCarouselWindow(index: number) {
    if (!this.isCarousel()) return;

    const visible = this.visibleCount();
    const offset = this.carouselOffset();

    if (index < offset) {
      this.carouselOffset.set(index);
    } else if (index >= offset + visible) {
      this.carouselOffset.set(index - visible + 1);
    }
  }

  private updateLayout() {
    if (!isPlatformBrowser(this.platformId)) return;

    this.visibleCount.set(this.getVisibleCount());

    const viewport = this.thumbViewport()?.nativeElement;
    if (!viewport) return;

    const visible = this.visibleCount();
    const thumbWidth = this.getThumbWidth(viewport);

    this.thumbWidthPx.set(thumbWidth);
    if (thumbWidth > 0) {
      viewport.style.setProperty('--thumb-width', `${thumbWidth}px`);
    }

    const maxOffset = Math.max(0, this.product.images.length - visible);
    if (this.carouselOffset() > maxOffset) {
      this.carouselOffset.set(maxOffset);
    }
  }

  private getVisibleCount() {
    if (!isPlatformBrowser(this.platformId)) return DESKTOP_VISIBLE;

    const width = window.innerWidth;
    if (width <= TABLET_BREAKPOINT) return MOBILE_VISIBLE;
    return DESKTOP_VISIBLE;
  }

  private getThumbWidth(viewport: HTMLElement) {
    const visible = this.visibleCount();
    if (visible <= 0) return 0;
    return (viewport.clientWidth - THUMB_GAP_PX * (visible - 1)) / visible;
  }
}
