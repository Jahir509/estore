import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth-service';
import { CartStoreItem } from '../cart/cart.store-item';
import { DeliveryAddress } from '../../types/cart.interface';
import { Observable } from 'rxjs';
import { Order, OrderItem, PastOrder, ProductDetails } from '../../types/order.interface';
import { get } from 'node:http';

@Injectable()
export class OrderService {
  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private cartStore: CartStoreItem
  ) { }


  saveOrder(deliveryAddress: DeliveryAddress): Observable<any> {
    const url = 'http://localhost:5001/orders/place';
    const orderDetails: OrderItem[] = []

    this.cartStore.cart().products.forEach((product) => {
      const orderItem: OrderItem = {
        productId: product.product.id,
        qty: product.quantity,
        price: product.product.price,
        amount: product.amount
      };
      orderDetails.push(orderItem);
    });

    const order: Order = {
      userName: deliveryAddress.userName,
      email: deliveryAddress.email,
      address: deliveryAddress.address,
      city: deliveryAddress.city,
      state: deliveryAddress.state,
      pin: deliveryAddress.pin,
      total: this.cartStore.cart().totalAmount,
      orderDetails
    }
    const auth_header = new HttpHeaders({'Authorization': `${this.authService.token}`});
    
    return this.http.post(url, order, { headers: auth_header });  
  }

  getPastOrders(): Observable<PastOrder[]>{
    const url = 'http://localhost:5001/orders/my-orders';
    const auth_header = new HttpHeaders({'Authorization': `${this.authService.token}`});
    return this.http.get<PastOrder[]>(url, { headers: auth_header });
  }

  getOrderDetails(orderId: number): Observable<ProductDetails[]>{ 
    const url = `http://localhost:5001/orders/order-details/${orderId}`;
    const auth_header = new HttpHeaders({'Authorization': `${this.authService.token}`});
    return this.http.get<ProductDetails[]>(url, { headers: auth_header });
  }
}



