export interface Order {
    userName: string;
    email: string;
    address: string;
    city: string;
    state: string;
    pin: string;
    total: number;
    orderDetails: OrderItem[];
}
    
export interface OrderItem {
    productId: number;
    qty: number;
    price: number;
    amount: number;
}

export interface PastOrder{
    orderId: number;
    orderDate: string;
    userName: string;
    address: string;
    city: string;
    state: string;
    pin: string;
    total: string;
}


export interface ProductDetails{
    productId: number;
    product_name: string;
    product_img: string;
    qty: number;
    price: string;
    amount: string;
}