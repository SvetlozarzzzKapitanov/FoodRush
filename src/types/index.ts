export interface Product {
    id: number
    name: string
    description: string
    price: number
    imageUrl: string
    category: string
    restaurantId: number
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
export interface OrderItem {
    name: string;
    quantity: number;
}

export interface Order {
    id: number;
    customerName: string;
    items: OrderItem[];
    totalPrice: number;
    status: string;
    createdDate: string;
}
export interface Props {
    restaurantId: number;
}