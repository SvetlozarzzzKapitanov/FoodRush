import API from './api'
import { Order } from '../types'

/**
 * Retrieve total revenue for a restaurant over a date range
 * GET /api/orders/revenue?restaurantId={id}&startDate={ISO}&endDate={ISO}
 */
export const getRestaurantRevenue = async (
    restaurantId: number,
    startDate: string,
    endDate: string
): Promise<number> => {
    const res = await API.get<number>('/orders/revenue', {
        params: { restaurantId, startDate, endDate }
    })
    return res.data
}

/**
 * Retrieve earnings (employee view) for a delivery person
 * GET /api/orders/earnings/{deliveryId}?startDate={ISO}&endDate={ISO}
 */
export const getEarningsForDelivery = async (
    deliveryId: number,
    startDate: string,
    endDate: string
): Promise<number> => {
    const res = await API.get<number>(`/orders/earnings/${deliveryId}`, {
        params: { startDate, endDate }
    })
    return res.data
}

/**
 * Mark an order as "Preparing"
 * POST /api/orders/preparing/{orderId}
 */
export const prepareOrder = async (orderId: number): Promise<void> => {
    await API.post(`/orders/preparing/${orderId}`)
}

/**
 * Cancel an order
 * POST /api/orders/cancel/{orderId}
 */
export const cancelOrder = async (orderId: number): Promise<void> => {
    await API.post(`/orders/cancel/${orderId}`)
}

/**
 * List pending orders for a specific restaurant
 * GET /api/orders/pending/{restaurantId}
 */
export const getPendingOrdersByRestaurantId = async (
    restaurantId: number
): Promise<Order[]> => {
    const res = await API.get<Order[]>(`/orders/pending/${restaurantId}`)
    return res.data
}

/**
 * List *all* pending orders (global view)
 * GET /api/orders/pending
 */
export const getAllPendingOrders = async (): Promise<Order[]> => {
    const res = await API.get<Order[]>('/orders/pending')
    return res.data
}