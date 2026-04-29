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
import { OrderService } from '../services/order/order-service';
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

  alertType: number = 0;
  alertMessage: string = '';
  disableCheckout: boolean = false;
  
  user = signal<LoggedInUser>({} as LoggedInUser);
  orderForm: WritableSignal<FormGroup>;

  constructor(public cartStore: CartStoreItem,
    private router: Router,
    private authService: AuthService,
    private fb: FormBuilder,
    private orderService: OrderService
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
    if(!this.authService.isUserAuthenticated){
      this.alertType = 2;
      this.alertMessage = 'Please login to place the order.';
      return;
    }
    

    const form = this.orderForm();
    if(form.invalid){
      this.alertType = 2;
      this.alertMessage = 'Please fill all the required fields.';
      form.markAllAsTouched();
      return;
    }

    if(!this.user()){
      this.alertType = 2;
      this.alertMessage = 'User information is missing. Please login again.';
      return;
    }

    
    this.disableCheckout = true;
    const deliveryAddress = {
      userName: form.get('name')?.value,
      email: form.get('email')?.value,
      address: form.get('address')?.value,
      city: form.get('city')?.value,
      state: form.get('state')?.value,
      pin: form.get('pin')?.value,
    };

    this.orderService.saveOrder(deliveryAddress).subscribe({
      next: (data) => {
        this.alertType = 1;
        this.alertMessage = 'Order placed successfully.';
        this.cartStore.clearCart();
        this.disableCheckout = false;
      },
      error: (err) => {
        this.alertType = 2;
        if (err.error?.message === 'Authorization failed!') {
          this.alertMessage = 'Please log in to register your order.';
        } else {
          this.alertMessage =
            err.error?.message || 'An unexpected error occurred.';
        }
      }
    });
  }
}
