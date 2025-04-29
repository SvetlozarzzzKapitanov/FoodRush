// src/api/orderApi.ts
import API from './api'
import { Order } from '../types'

export interface CreateOrderRequest {
    userId: number;
    products: number[];
}

export const createOrder = async (customerId: number, productIds: number[]): Promise<Order> => {
    const res = await API.post<Order>(
        `/orders/create?customerId=${customerId}`,
        JSON.stringify(productIds),
        {
            headers: {
                'Content-Type': 'application/json'
            }
        }
    );
    return res.data;
}



export const trackOrderById = async (orderId: number): Promise<Order> => {
    const res = await API.get<Order>(`/orders/track/${orderId}`);
    return res.data;
}
