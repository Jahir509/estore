import { Injectable } from '@angular/core';
import { Product } from '../../types/product.interface';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class ProductService {
  constructor(private http: HttpClient) {}

  getProductsList(): Observable<Product[]> {
    return this.http.get<Product[]>('http://localhost:5001/products');
  }

  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`http://localhost:5001/products/${id}`);
  }
}
