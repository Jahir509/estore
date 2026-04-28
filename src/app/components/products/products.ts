import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Ratings } from "../ratings/ratings";
import { ProductStoreItem } from '../home/services/products/product.store-item';
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { faBoxOpen, faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { RouterLink } from '@angular/router';
import { Product } from '../home/types/product.interface';
import { CartStoreItem } from '../home/services/cart/cart.store-item';
@Component({
  selector: 'app-products',
  imports: [CommonModule, Ratings, FontAwesomeModule,RouterLink],
  templateUrl: './products.html',
  styleUrl: './products.css',
})
export class Products {
  faBoxOpen = faBoxOpen;
  faShoppingCart = faShoppingCart;
  productStore = inject(ProductStoreItem);
  readonly cart = inject(CartStoreItem);
  products = this.productStore.products;
  loading = this.productStore.loading;


  addToCart(product:Product): void {
    this.cart.addToCart(product);
  }
}
