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

    decreaseProductQuantity(cartItem: CartItem): void {
        const updatedItems = this._products()
        .map((item) => {
            if (item.product.id === cartItem.product.id) {
                if (item.quantity <= 1) {
                    return null;
                }
                return {
                    ...item,
                    quantity: item.quantity - 1,
                    amount: item.amount - Number(item.product.price),
                };
            }
            return item;
        })
        .filter(Boolean) as CartItem[]; //Remove nulls

        this._products.set(updatedItems);
    }

  removeProduct(cartItem: CartItem): void {
    const updatedItems = this._products().filter(
      (item) => item.product.id !== cartItem.product.id
    );
    this._products.set(updatedItems);
  }
}