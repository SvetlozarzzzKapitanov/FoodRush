import React, { useState } from 'react'
import { createOrder } from '../api/orderApi'
import { Order } from '../types'

const OrderTestPage: React.FC = () => {
    const [order, setOrder] = useState<Order | null>(null)
    const [error, setError] = useState<string | null>(null)

    const handleCreateOrder = async () => {
        try {
            const newOrder = await createOrder({
                userId: 1, // Replace with actual test user ID if needed
                products: [1, 2], // Replace with valid product IDs from your DB
            })
            setOrder(newOrder)
            setError(null)
        } catch (err) {
            setError('Failed to create order. Check console or backend logs.')
        }
    }

    return (
        <div style={{ padding: '2rem' }}>
            <h2>Order Test Page</h2>
            <button onClick={handleCreateOrder}>Create Order (Test)</button>

            {error && <p style={{ color: 'red' }}>{error}</p>}
            {order && (
                <div style={{ marginTop: '1rem' }}>
                    <h4>Order Created:</h4>
                    <pre>{JSON.stringify(order, null, 2)}</pre>
                </div>
            )}
        </div>
    )
}

export default OrderTestPage
