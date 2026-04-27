import { Component, inject, output } from '@angular/core';
import { Category } from '../types/category.interface';
import { CategoryService } from '../services/categories/category-service';
import { CategoriesStoreItem } from '../services/categories/categories.store-item';

@Component({
  selector: 'app-navigation',
  imports: [],
  templateUrl: './navigation.html',
  styleUrl: './navigation.css',
})
export class Navigation {
  parentCategoryClicked = output<number>();
  constructor(public categoryStore: CategoriesStoreItem) {}

  getTopLevelCategories(): Category[] {
    return this.categoryStore.topLevelCategories();
  }

  onCategoryClick(category: Category): void {
    this.parentCategoryClicked.emit(category.id);
  }
}
