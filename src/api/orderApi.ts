// src/api/orderApi.ts
import axios from "axios";
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
export async function fetchOrderDetails(orderId: number, customerId: number): Promise<Order | null> {
    const res = await axios.get<Order[]>(`/api/orders/customer/${customerId}`);
    const orders = res.data;
    return orders.find(order => order.id === orderId) || null;
}

