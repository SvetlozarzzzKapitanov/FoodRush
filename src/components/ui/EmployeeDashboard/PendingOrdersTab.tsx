import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ProductManagmentTab.css'; // Reuse the same style

interface OrderItem {
    name: string;
    quantity: number;
}

interface Order {
    id: number;
    customerName: string;
    items: OrderItem[];
    totalPrice: number;
    status: string;
}

interface Props {
    restaurantId: number;
}

const PendingOrdersTab: React.FC<Props> = ({ restaurantId }) => {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                setLoading(true);
                const res = await axios.get(`/api/orders/pending/${restaurantId}`);
                const list = Array.isArray(res.data) ? res.data : [];
                setOrders(list);
            } catch (err) {
                console.error(err);
                setError('Failed to fetch pending orders.');
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, [restaurantId]);

    const handlePrepare = async (orderId: number) => {
        try {
            await axios.post(`/api/orders/preparing/${orderId}`);
            setOrders(prev => prev.filter(o => o.id !== orderId));
        } catch (err) {
            console.error(err);
            alert('Failed to mark order as preparing.');
        }
    };

    const handleCancel = async (orderId: number) => {
        try {
            await axios.post(`/api/orders/cancel/${orderId}`);
            setOrders(prev => prev.filter(o => o.id !== orderId));
        } catch (err) {
            console.error(err);
            alert('Failed to cancel order.');
        }
    };

    return (
        <section className="product-management">
            <h3>Pending Orders</h3>
            {loading ? (
                <p>Loading pending orders...</p>
            ) : error ? (
                <p>{error}</p>
            ) : Array.isArray(orders) && orders.length > 0 ? (
                orders.map(order => (
                    <div key={order.id} className="product-row">
                        <div>
                            <strong>{order.customerName}</strong><br />
                            <small>Order #{order.id}</small>
                        </div>
                        <div>
                        </div>
                        <div>${order.totalPrice.toFixed(2)}</div>
                        <div>Status: {order.status}</div>
                        <div className="product-actions">
                            <button className="save" onClick={() => handlePrepare(order.id)}>Prepare</button>
                            <button className="delete" onClick={() => handleCancel(order.id)}>Cancel</button>
                        </div>
                    </div>
                ))
            ) : (
                <p>No pending orders.</p>
            )}
        </section>
    );
};

export default PendingOrdersTab;
