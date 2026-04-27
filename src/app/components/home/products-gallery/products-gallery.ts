import { Component } from '@angular/core';
import { ProductStoreItem } from '../services/products/product.store-item';
import { Sidenavigation } from '../sidenavigation/sidenavigation';
import { Products } from '../../products/products';

@Component({
  selector: 'app-products-gallery',
  imports: [Sidenavigation,Products],
  templateUrl: './products-gallery.html',
  styleUrl: './products-gallery.css',
})
export class ProductsGallery {

  constructor(private productStoreItem: ProductStoreItem){}

  onSelectSubCategory(subCategoryId: number): void {
    this.productStoreItem.loadProducts({ sub_category_id: subCategoryId });
  }
}
