import API from './api'

/**
 * Delivery person accepts an order
 * POST /api/orders/accept/{orderId}?deliveryId={id}
 */
export const acceptOrder = async (
    orderId: number,
    deliveryId: number
): Promise<string> => {
    const res = await API.post<string>(`/orders/accept/${orderId}`, null, {
        params: { deliveryId }
    })
    return res.data
}

/**
 * Mark an order as Delivered
 * PUT /api/orders/delivered/{orderId}?deliveryId={id}
 */
export const markOrderDelivered = async (
    orderId: number,
    deliveryId: number
): Promise<string> => {
    const res = await API.put<string>(`/orders/delivered/${orderId}`, null, {
        params: { deliveryId }
    })
    return res.data
}

/**
 * Get total earnings for a delivery person (no bonus)
 * GET /api/orders/earnings/{deliveryId}
 */
export const getDeliveryEarnings = async (
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
 * Get total earnings with bonus for a delivery person
 * GET /api/deliveries/earnings?deliveryId={id}&startDate={ISO}&endDate={ISO}
 */
export const getEarningsWithBonus = async (
    deliveryId: number,
    startDate: string,
    endDate: string
): Promise<number> => {
    const res = await API.get<number>('/deliveries/earnings', {
        params: { deliveryId, startDate, endDate }
    })
    return res.data
}