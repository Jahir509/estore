import { Component } from '@angular/core';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { CategoryService } from '../services/category-service';
import { Category } from '../types/category';

@Component({
  selector: 'app-sidenavigation',
  imports: [FontAwesomeModule],
  templateUrl: './sidenavigation.html',
  styleUrl: './sidenavigation.css',
})
export class Sidenavigation {
  faAngleDown = faAngleDown;
  categories: Category[] = []

  constructor(private categoryService: CategoryService) {
    this.categoryService.getAllCategories().subscribe(categories => {
      this.categories = categories;
    });
  }

  getCategories(parentCategoryId?: number | null): Category[] {
    return this.categories.filter((category) => parentCategoryId ? category.parent_category_id === parentCategoryId : !category.parent_category_id);
  }
}
