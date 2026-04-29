import { Component, effect, signal, WritableSignal } from '@angular/core';
import { faBoxOpen } from '@fortawesome/free-solid-svg-icons';
import { faShoppingCart,faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CartStoreItem } from '../services/cart/cart.store-item';
import { Router } from '@angular/router';
import { Ratings } from '../../ratings/ratings';
import { CommonModule } from '@angular/common';
import { CartItem } from '../types/cart.interface';
import { AuthService } from '../services/auth/auth-service';
import { LoggedInUser } from '../types/user.interface';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
@Component({
  selector: 'app-cart',
  imports: [FontAwesomeModule,Ratings,CommonModule,ReactiveFormsModule],
  templateUrl: './cart.html',
  styleUrl: './cart.css',
})
export class Cart {
  faTrash = faTrash;
  faBoxOpen = faBoxOpen;
  faShoppingCart = faShoppingCart;
  
  user = signal<LoggedInUser>({} as LoggedInUser);
  orderForm: WritableSignal<FormGroup>;

  constructor(public cartStore: CartStoreItem,
    private router: Router,
    private authService: AuthService,
    private fb: FormBuilder
  ) {
    this.authService.loggedInUser$.subscribe(user => {
      this.user.set(user);
    });

    this.orderForm = signal(this.createOrderForm(this.user()));

    effect(() => {
      const newUser = this.user()
      this.orderForm.set(this.createOrderForm(newUser));
    })
  }

  private createOrderForm(user:LoggedInUser | null): FormGroup {
    return this.fb.group({
      name: [ user?.firstName && user?.lastName 
        ? `${user?.firstName} ${user?.lastName}`.trim() 
        : '',
        Validators.required
      ],
      address: [user?.address || '', Validators.required],
      city: [user?.city || '', Validators.required],
      state: [user?.state || '', Validators.required],
      pin: [user?.pin || '', Validators.required],
      email: [user?.email || '', Validators.required],
    });
  }
  
  navigateToHome(): void {
    this.router.navigate(['home/products']);
  }

  updateQuantity($event: any, cartItem: CartItem): void {
    if ($event.target.innerText === '+') {
      this.cartStore.addToCart(cartItem.product);
    } else if ($event.target.innerText === '-') {
      this.cartStore.decreaseProductQuantity(cartItem);
    }
  }

  removeItem(cartItem: CartItem): void {
    this.cartStore.removeProduct(cartItem);
  }

  onSubmit(): void {
    if (this.orderForm().valid) {
      // Here you would typically send the order data to your backend API
      console.log('Order submitted:', this.orderForm().value, this.cartStore.cart());
      alert('Order placed successfully!');
      // Clear the cart after successful order placement
      this.cartStore.cart().products.forEach(item => this.cartStore.removeProduct(item));
    } else {
      alert('Please fill in all required fields.');
    }
  }
}
