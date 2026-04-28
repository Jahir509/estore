import { Product } from "./product.interface";

export interface CartItem {
    product: Product;
    quantity: number;
    amount: number;
}

export interface Cart {
    items: CartItem[];
    totalAmount: number;
    totalProducts: number;
}