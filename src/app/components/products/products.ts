import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Ratings } from "../ratings/ratings";
import { Product } from '../home/types/product.interface';
import { ProductStoreItem } from '../home/services/products/product.store-item';

@Component({
  selector: 'app-products',
  imports: [CommonModule, Ratings],
  templateUrl: './products.html',
  styleUrl: './products.css',
})
export class Products {
  productStore = inject(ProductStoreItem);
  products = this.productStore.products;
}
