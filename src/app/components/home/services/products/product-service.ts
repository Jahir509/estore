import { Injectable } from '@angular/core';
import { Product } from '../../types/product.interface';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseService } from '../base.service';

@Injectable()
export class ProductService extends BaseService<Product> {

  constructor(http: HttpClient) {
    super(http);
    this.apiUrl = '/products';
  }

  getProductsList(filters?:{
    parent_category_id?: number;
    sub_category_id?: number;
  }): Observable<Product[]> {
    let params = new HttpParams();

    if (filters?.parent_category_id != null){
      params = params.set('parent', filters.parent_category_id.toString());
    }
    if (filters?.sub_category_id != null){
      params = params.set('sub', filters.sub_category_id.toString());
    }
    
    return this.http.get<Product[]>(this.apiUrl, { params });
  }

  getProductById(id: number): Observable<Product> {
    return this.getById(id);
  }
}
