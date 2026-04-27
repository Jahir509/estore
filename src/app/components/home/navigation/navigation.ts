import { Component, inject } from '@angular/core';
import { Category } from '../types/category';
import { CategoryService } from '../services/category-service';
import { CategoriesStoreItem } from '../services/categories.store-item';

@Component({
  selector: 'app-navigation',
  imports: [],
  templateUrl: './navigation.html',
  styleUrl: './navigation.css',
})
export class Navigation {
  constructor(public categoryStore: CategoriesStoreItem) {}

  getTopLevelCategories(): Category[] {
    return this.categoryStore.topLevelCategories();
  }
}
