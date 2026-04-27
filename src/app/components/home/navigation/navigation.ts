import { Component, output, signal } from '@angular/core';
import { Category } from '../types/category.interface';
import { CategoriesStoreItem } from '../services/categories/categories.store-item';
import { NavigationEnd,Router, RouterLink } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-navigation',
  imports: [RouterLink],
  templateUrl: './navigation.html',
  styleUrl: './navigation.css',
})
export class Navigation {
  parentCategoryClicked = output<number>();
  displayOptions = signal<boolean>(true);

  constructor(public categoryStore: CategoriesStoreItem,private router:Router) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.displayOptions.set(event.url === '/home/products');
    });

  }

  getTopLevelCategories(): Category[] {
    return this.categoryStore.topLevelCategories();
  }

  onCategoryClick(category: Category): void {
    this.parentCategoryClicked.emit(category.id);
  }
}
