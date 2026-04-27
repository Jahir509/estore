import { Component } from '@angular/core';
import { Category } from '../types/category';
import { CategoryService } from '../services/category-service';

@Component({
  selector: 'app-navigation',
  imports: [],
  templateUrl: './navigation.html',
  styleUrl: './navigation.css',
})
export class Navigation {
  categories: Category[] = [];

  constructor(private categoryService: CategoryService) {
    this.categoryService.getAllCategories().subscribe((categories) => {
      this.categories = categories.filter((category)=> category.parent_category_id === null);
    });
  }



}
