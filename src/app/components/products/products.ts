import { Component } from '@angular/core';
import { ProductService } from './product-service';
import { CommonModule } from '@angular/common';
import { Ratings } from "../ratings/ratings";
import { ProductListItem } from './products.type';

@Component({
  selector: 'app-products',
  imports: [CommonModule, Ratings],
  templateUrl: './products.html',
  styleUrl: './products.css',
})
export class Products {
  products: ProductListItem[] = [];
  constructor(private productService: ProductService) {
    this.productService.getProductsList().subscribe((products) => {
      this.products = products;
    });
  }

}
