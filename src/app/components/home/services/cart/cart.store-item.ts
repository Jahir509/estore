import { computed, signal } from "@angular/core";
import { CartItem } from "../../types/cart.interface";
import { Product } from "../../types/product.interface";

export class CartStoreItem {
    private readonly _products = signal<CartItem[]>([]);

    readonly totalAmount = computed(()=> this._products().reduce((sum,item)=> sum + item.amount, 0));
    readonly totalProducts = computed(()=> this._products().reduce((count,item)=> count + item.quantity, 0));

    readonly cart = computed(() => ({
        products: this._products(),
        totalAmount: this.totalAmount(),
        totalProducts: this.totalProducts()
    }));

    addToCart(product:Product):void{
        const currentProducts = this._products();
        const existingProductIndex = currentProducts.findIndex(item => item.product.id === product.id);

        if(existingProductIndex === -1){
            this._products.set([...currentProducts,{product,quantity:1,amount:Number(product.price)}]);
        } else {
            const updatedProducts = [...currentProducts];
            const existingProduct = updatedProducts[existingProductIndex];
            updatedProducts[existingProductIndex] = {
                ...existingProduct,
                quantity: existingProduct.quantity + 1,
                amount: existingProduct.amount + Number(product.price)
            };
            this._products.set(updatedProducts);
        }
    }
}