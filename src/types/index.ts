export interface Product {
    id: number
    name: string
    description: string
    price: number
    imageUrl: string
    category: string
    restaurantId: number
}

export interface OrderProductInfo {
    productName: string;
    pricePerUnit: number;
    quantity: number;
    totalProductPrice: number;
}

export interface Order {
    products: OrderProductInfo[];
    totalPrice: number;
    orderStatus: string; // previously `orderStatus`
    createdDate: string;
    id: number;
}

export interface User {
    email: string;
    [key: string]: any;
}
export type Restaurant = {
    id: number;
    name: string;
    address: string;
    phoneNumber: string;
    products?: any[]; // if needed
};

export interface TrackOrder {
    id: number;
    status: string;
    totalPrice: number;
    createdDate: string;
}

export interface RegisterCredentials {
    email: string;
    password: string;
}
