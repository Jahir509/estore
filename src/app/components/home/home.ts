import { Component } from '@angular/core';
import { Header } from './header/header';
import { Navigation } from './navigation/navigation';
import { Sidenavigation } from './sidenavigation/sidenavigation';
import { Products } from "../products/products";
import { CategoryService } from './services/categories/category-service';
import { CategoriesStoreItem } from './services/categories/categories.store-item';

@Component({
  selector: 'app-home',
  imports: [Header, Navigation, Sidenavigation, Products],
  templateUrl: './home.html',
  styleUrl: './home.css',
  providers: [CategoryService,CategoriesStoreItem]
})
export class Home {
  constructor(private categoryStoreItem: CategoriesStoreItem) {
    this.categoryStoreItem.loadCategories();
  }
}
