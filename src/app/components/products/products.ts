import { Component, inject } from '@angular/core';
import { ProductService } from '../home/services/products/product-service';
import { CommonModule } from '@angular/common';
import { Ratings } from "../ratings/ratings";
import { Product } from '../home/types/product.interface';
import { ProductStoreItem } from '../home/services/products/product.store-item';

@Component({
  selector: 'app-products',
  imports: [CommonModule, Ratings],
  templateUrl: './products.html',
  styleUrl: './products.css',
  providers: [ProductService, ProductStoreItem]
})
export class Products {
  private productStore = inject(ProductStoreItem);
  readonly products =  this.productStore.products();
}
