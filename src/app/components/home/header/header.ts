import { Component, output } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faSearch,
  faUserCircle,
  faShoppingCart,
} from '@fortawesome/free-solid-svg-icons';
import { CategoriesStoreItem } from '../services/categories/categories.store-item';

@Component({
  selector: 'app-header',
  imports: [FontAwesomeModule],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  faSearch = faSearch;
  faUserCircle = faUserCircle;
  faShoppingCart = faShoppingCart;

  // Event
  onMainCategoryClicked = output<number>();

  constructor(public categoryStore: CategoriesStoreItem) {}

  onCategorySelect(event: Event) {
    const categoryId = (event.target as HTMLSelectElement).value;
    this.onMainCategoryClicked.emit(Number(categoryId));
  }
}
