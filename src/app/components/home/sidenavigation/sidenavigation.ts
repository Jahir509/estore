import { Component, inject, output } from '@angular/core';
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
  
  // Events
  subCategoryClicked = output<number>();

  getCategories(parentCategoryId?: number | null): Category[] {
    return this.categories().filter((category) => parentCategoryId ? category.parent_category_id === parentCategoryId : !category.parent_category_id);
  }

  onSubCategoryClicked(category:Category) {
    this.subCategoryClicked.emit(category.id);
    console.log(`Subcategory clicked: ${category.category} (ID: ${category.id})`);
  }

}
