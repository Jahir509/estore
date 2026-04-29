import { Component, computed, effect, inject, signal } from '@angular/core';
import { PastOrder, ProductDetails } from '../../types/order.interface';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth/auth-service';
import { OrderService } from '../../services/order/order-service';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-past-orders',
  imports: [CommonModule],
  templateUrl: './past-orders.html',
  styleUrl: './past-orders.css',
})
export class PastOrders {
  private authService = inject(AuthService);
  private orderService = inject(OrderService);

  readonly pastOrderProducts = signal<ProductDetails[]>([]);
  readonly user = this.authService.loggedInUser;
  readonly pastOrders = signal<PastOrder[]>([]);
  selectedOrderId = signal<number | null>(null);
  readonly pastOrder = signal<PastOrder | null>(null);
  constructor(){
    this.orderService.getPastOrders().subscribe(
      (orders) => {
        this.pastOrders.set(orders);
        console.log(this.pastOrders())
        console.log(this.user)
      },
      (error) => {
        console.error('Error fetching past orders:', error);
        this.pastOrders.set([]);
      }
    );

    effect(() => {
      const orderId = this.selectedOrderId();
      this.pastOrder.set(this.pastOrders().find(order => order.orderId === orderId) || null);
      if (orderId) {
        this.orderService.getOrderDetails(orderId).subscribe(
          (products) => {
            this.pastOrderProducts.set(products);
            console.log('Fetched products for order', orderId, products);
          },
          (error) => {
            console.error('Error fetching order details:', error);
            this.pastOrderProducts.set([]);
          }
        );
      } else {
        this.pastOrderProducts.set([]);
      }
    });
  }

  selectOrder(event: Event): void {
    const value = Number.parseInt((event.target as HTMLSelectElement).value);
    this.selectedOrderId.set(value > 0 ? value : null);
  }
  
}
