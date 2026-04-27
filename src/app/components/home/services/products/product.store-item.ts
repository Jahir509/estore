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



    loadProducts() {
        this.productService.getProductsList().subscribe((products) => {
            this._products.set(products);
        });
    }
}