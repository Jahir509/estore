import { signal, Injectable } from '@angular/core';
import {Product} from '../../types/product.interface';
import { ProductService } from './product-service';

@Injectable()
export class ProductStoreItem{
    private readonly _products = signal<Product[]>([]);

    readonly products = this._products.asReadonly();

    constructor(private productService: ProductService) {
        this.loadProducts();
    }



    loadProducts(filters?:{
        parent_category_id?: number;
        sub_category_id?: number;
    }) {
        this.productService.getProductsList(filters).subscribe((products) => {
            this._products.set(products);
        });
    }
}