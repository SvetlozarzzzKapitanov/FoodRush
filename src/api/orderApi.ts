// src/api/orderApi.ts

import API from './api';
import { Order } from '../types';

/**
 * Payload for creating a new order
 */
export interface CreateOrderRequest {
    userId: number;
    products: number[];
}

/**
 * Create a new order for a customer
 * POST /api/orders/create?customerId={customerId}
 */
export const createOrder = async (
    customerId: number,
    productIds: number[]
): Promise<Order> => {
    const res = await API.post<Order>(
        `/orders/create?customerId=${customerId}`,
        JSON.stringify(productIds),
        {
            headers: { 'Content-Type': 'application/json' }
        }
    );
    return res.data;
};

/**
 * Get full order with status and products for tracking view
 * GET /api/orders/track/{orderId}
 */
export const fetchOrderDetails = async (
    orderId: number,
    customerId: number
): Promise<Order> => {
    const res = await API.get<Order>(`/orders/track/${orderId}?customerId=${customerId}`);
    return res.data;
};
