import React, { useEffect, useState } from 'react'
import { Order } from '../types'
import API from '../api/api'
import PageWrapper from '../components/ui/Other/PageWrapper.tsx'

const OrderListPage: React.FC = () => {
    const [orders, setOrders] = useState<Order[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const res = await API.get<Order[]>('/orders')
                setOrders(res.data)
            } catch (err) {
                setError('Failed to load orders.')
            } finally {
                setLoading(false)
            }
        }

        fetchOrders()
    }, [])

    return (
        <PageWrapper loading={loading}>
            <h2>User Orders</h2>
            {error ? (
                <p style={{ color: 'red' }}>{error}</p>
            ) : orders.length > 0 ? (
                <ul>
                    {orders.map(order => (
                        <li key={order.id}>
                            Order #{order.id} — {order.status} — {order.total} USD
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No orders found.</p>
            )}
        </PageWrapper>
    )
}

export default OrderListPage