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
    id: number;
    productName: string;
    quantity: number;
    price: number;
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
export interface Delivery {
    id: number;
}
export interface DeliveryOrder extends Order {
    products: Product[];
    delivery?: Delivery;
}
export interface OrderProductInfoDTO {
    productName: string;
    pricePerUnit: number;
    quantity: number;
    totalPrice: number;
}

export interface OrderSummaryDTO {
    products: OrderProductInfoDTO[];
    totalPrice: number;
    orderStatus: string;
}
