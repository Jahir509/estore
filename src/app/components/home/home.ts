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
import { RouterOutlet } from '@angular/router';
import { CartStoreItem } from './services/cart/cart.store-item';
import { AuthService } from './services/auth/auth-service';
import { OrderService } from './services/order/order-service';

@Component({
  selector: 'app-home',
  imports: [Header, Navigation, RouterOutlet],
  templateUrl: './home.html',
  styleUrl: './home.css',
  providers: [
    CategoryService,
    CategoriesStoreItem,
    ProductService,
    ProductStoreItem,
    CartStoreItem,
    AuthService,
    OrderService
  ]
})
export class Home {


  constructor(private categoryStoreItem: CategoriesStoreItem, private productStoreItem: ProductStoreItem) {
    this.categoryStoreItem.loadCategories();
  }



  onSelectMainCategory(paentCategoryId: number) {
    this.productStoreItem.loadProducts({ parent_category_id: paentCategoryId });
  }

  onSearchOptionClicked(filter: SearchType) {
    this.productStoreItem.loadProducts({ parent_category_id: filter.categoryId, keyword: filter.keyword });
  }
}
