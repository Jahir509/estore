import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Ratings } from "../ratings/ratings";
import { ProductStoreItem } from '../home/services/products/product.store-item';
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { faBoxOpen } from "@fortawesome/free-solid-svg-icons";
@Component({
  selector: 'app-products',
  imports: [CommonModule, Ratings, FontAwesomeModule],
  templateUrl: './products.html',
  styleUrl: './products.css',
})
export class Products {
  faBoxOpen = faBoxOpen;
  productStore = inject(ProductStoreItem);
  products = this.productStore.products;
  loading = this.productStore.loading;
}
