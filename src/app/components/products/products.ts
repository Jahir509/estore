import { Component } from '@angular/core';
import { ProductService } from './product-service';
import { CommonModule } from '@angular/common';
import { Ratings } from "../ratings/ratings";

@Component({
  selector: 'app-products',
  imports: [CommonModule, Ratings],
  templateUrl: './products.html',
  styleUrl: './products.css',
})
export class Products {
  constructor(private productService: ProductService) {}

  getProductsList() {
    return this.productService.getProductsList();
  }
  
}
