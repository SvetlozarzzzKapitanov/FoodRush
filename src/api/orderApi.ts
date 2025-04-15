import API from './api'
import { Order } from '../types'

export interface CreateOrderRequest {
    userId: number
    products: number[]
}

export const createOrder = async (data: CreateOrderRequest): Promise<Order> => {
    const res = await API.post<Order>('/orders/create', data)
    return res.data
}

export const getOrderById = async (id: number): Promise<Order> => {
    const res = await API.get<Order>(`/orders/${id}`)
    return res.data
}
