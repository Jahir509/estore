import { Component, output } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faSearch,
  faUserCircle,
  faShoppingCart,
} from '@fortawesome/free-solid-svg-icons';
import { CategoriesStoreItem } from '../services/categories/categories.store-item';
import { SearchType } from '../types/searchType.interface';


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
  onSearchClicked = output<SearchType>();
 

  constructor(public categoryStore: CategoriesStoreItem) {}

  onCategorySelect(categoryId: string, keyword: string): void {
    if(!categoryId || !keyword) {
      return;
    }
    this.onSearchClicked.emit({ categoryId: +categoryId, keyword });
  }
}
