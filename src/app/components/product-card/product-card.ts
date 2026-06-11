import { Component, Input, inject } from '@angular/core';
import { Product } from '../../data/products';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-product-card',
  imports: [],
  templateUrl: './product-card.html',
  styleUrl: './product-card.scss',
})
export class ProductCardComponent {
  @Input({ required: true }) product!: Product;
  @Input() ctaLabel = 'Saiba mais';

  langService = inject(LanguageService);

  get lang() {
    return this.langService.lang();
  }
}
