import { signal, Injectable } from '@angular/core';
import {Product} from '../../types/product.interface';
import { ProductService } from './product-service';

@Injectable()
export class ProductStoreItem{
    private readonly _products = signal<Product[]>([]);
    private readonly _loading = signal<boolean>(false);

    readonly products = this._products.asReadonly();
    readonly loading = this._loading.asReadonly();

    constructor(private productService: ProductService) {
        this.loadProducts();
    }



    loadProducts(filters?:{
        parent_category_id?: number;
        sub_category_id?: number;
        keyword?: string;
    }) {
        this._loading.set(true);
        this.productService.getProductsList(filters).subscribe((products) => {
            this._products.set(products);
            this._loading.set(false);
        });
    }
}