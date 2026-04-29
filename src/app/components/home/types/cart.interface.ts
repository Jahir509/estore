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

export interface DeliveryAddress {
    userName: string;
    email: string;
    address: string;
    city: string;
    state: string;
    pin: string;
}