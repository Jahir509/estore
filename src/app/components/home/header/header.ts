import { Component, output, signal } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faSearch,
  faUserCircle,
  faShoppingCart,
} from '@fortawesome/free-solid-svg-icons';
import { CategoriesStoreItem } from '../services/categories/categories.store-item';
import { SearchType } from '../types/searchType.interface';
import { Router,NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

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
  displayOptions = signal<boolean>(true);


  constructor(public categoryStore: CategoriesStoreItem,private router:Router) {
     this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.displayOptions.set(event.url === '/home/products');
    });
  }

  onCategorySelect(categoryId: string, keyword: string): void {
    if(!categoryId || !keyword) {
      return;
    }
    this.onSearchClicked.emit({ categoryId: +categoryId, keyword });
  }
}
