import { Component, inject, signal } from '@angular/core';
import { Ratings } from '../../ratings/ratings';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/products/product-service';
import { Product } from '../types/product.interface';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';
import { CartStoreItem } from '../services/cart/cart.store-item';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";

@Component({
  selector: 'app-products-details',
  imports: [Ratings, CommonModule, FontAwesomeModule],
  templateUrl: './products-details.html',
  styleUrl: './products-details.css',
})
export class ProductsDetails {
  private readonly route = inject(ActivatedRoute);
  private readonly productService = inject(ProductService);
  private readonly cart = inject(CartStoreItem);
  faShoppingCart = faShoppingCart;
  
  readonly product = signal<Product | null>(null);

  constructor(){
    const idParam = this.route.snapshot.paramMap.get('id');
    const id = idParam ? Number(idParam) : null;
    this.getProductDetails(id);
  }

  getProductDetails(id: number | null){
    if(id !== null && !isNaN(id)){
      this.productService.getById(id)
      .pipe(takeUntilDestroyed())
      .subscribe((response) => {
        this.product.set(Array.isArray(response) ? response[0] : response);
      });
      return;
    }
  }

  addToCart(): void {
    const currentProduct = this.product();
    if(currentProduct){
      this.cart.addToCart(currentProduct);
    }
  }
}
