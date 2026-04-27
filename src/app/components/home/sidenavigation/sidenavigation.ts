import { Component, inject } from '@angular/core';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { Category } from '../types/category.interface';
import { CategoriesStoreItem } from '../services/categories/categories.store-item';

@Component({
  selector: 'app-sidenavigation',
  imports: [FontAwesomeModule],
  templateUrl: './sidenavigation.html',
  styleUrl: './sidenavigation.css',
})
export class Sidenavigation {
  faAngleDown = faAngleDown;
  private categoryStore = inject(CategoriesStoreItem);

  readonly categories = this.categoryStore.categories;

  getCategories(parentCategoryId?: number | null): Category[] {
    return this.categories().filter((category) => parentCategoryId ? category.parent_category_id === parentCategoryId : !category.parent_category_id);
  }
}
