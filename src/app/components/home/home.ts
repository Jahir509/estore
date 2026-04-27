import { Component } from '@angular/core';
import { Header } from './header/header';
import { Navigation } from './navigation/navigation';
import { Sidenavigation } from './sidenavigation/sidenavigation';
import { Products } from "../products/products";
import { CategoryService } from './services/categories/category-service';
import { CategoriesStoreItem } from './services/categories/categories.store-item';
import { ProductService } from './services/products/product-service';
import { ProductStoreItem } from './services/products/product.store-item';
import { SearchType } from './types/searchType.interface';

@Component({
  selector: 'app-home',
  imports: [Header, Navigation, Sidenavigation, Products],
  templateUrl: './home.html',
  styleUrl: './home.css',
  providers: [CategoryService,CategoriesStoreItem, ProductService, ProductStoreItem]
})
export class Home {


  constructor(private categoryStoreItem: CategoriesStoreItem, private productStoreItem: ProductStoreItem) {
    this.categoryStoreItem.loadCategories();
  }

  onSelectSubCategory(subCategoryId: number): void {
    this.productStoreItem.loadProducts({ sub_category_id: subCategoryId });
  }

  onSelectMainCategory(paentCategoryId: number) {
    this.productStoreItem.loadProducts({ parent_category_id: paentCategoryId });
  }

  onSearchOptionClicked(filter: SearchType) {
    this.productStoreItem.loadProducts({ parent_category_id: filter.categoryId, keyword: filter.keyword });
  }
}
