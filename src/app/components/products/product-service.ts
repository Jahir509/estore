import { Injectable } from '@angular/core';
import { ProductListItem } from './products.type';
import { products } from './products.data';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}

  getProductsList(): Observable<ProductListItem[]> {
    return this.http.get<ProductListItem[]>('http://localhost:5001/products');
  }

  getProductById(id: number): Observable<ProductListItem> {
    return this.http.get<ProductListItem>(`http://localhost:5001/products/${id}`);
  }
}
