import { Component } from '@angular/core';
import { faBoxOpen } from '@fortawesome/free-solid-svg-icons';
import { faShoppingCart,faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CartStoreItem } from '../services/cart/cart.store-item';
import { Router } from '@angular/router';
import { Ratings } from '../../ratings/ratings';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-cart',
  imports: [FontAwesomeModule,Ratings,CommonModule],
  templateUrl: './cart.html',
  styleUrl: './cart.css',
})
export class Cart {
  faTrash = faTrash;
  faBoxOpen = faBoxOpen;
  faShoppingCart = faShoppingCart;

  constructor(public cartStore: CartStoreItem, private router: Router) {}
  
  navigateToHome(): void {
    this.router.navigate(['home/products']);
  }
}
