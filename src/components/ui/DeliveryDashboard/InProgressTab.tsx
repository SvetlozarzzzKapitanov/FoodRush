import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { parseJwt} from "../../../assets/parseJwt.ts";
import '../styles/DeliveryTab.css';

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

const InProgressTab: React.FC = () => {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                setLoading(true);
                const token = localStorage.getItem('token');
                const decoded = parseJwt(token);
                const deliveryId = decoded?.user_id;

                const res = await axios.get(`/api/orders/customer/${deliveryId}`);
                const allOrders: Order[] = res.data || [];

                const inProgress = allOrders.filter(o =>
                    ['Accepted', 'Out for Delivery', 'Preparing'].includes(o.status)
                );

                setOrders(inProgress);
            } catch (err) {
                console.error(err);
                setError('Failed to fetch orders.');
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    const markDelivered = async (orderId: number) => {
        try {
            const token = localStorage.getItem('token');
            const decoded = parseJwt(token);
            const deliveryId = decoded?.user_id;

            await axios.put(`/api/orders/delivered/${orderId}?deliveryId=${deliveryId}`);
            setOrders(prev => prev.filter(o => o.id !== orderId));
        } catch (err) {
            console.error(err);
            alert('Failed to mark as delivered.');
        }
    };

    return (
        <section className="product-management">
            <h3>Orders In Progress</h3>

            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p style={{ color: 'red' }}>{error}</p>
            ) : orders.length === 0 ? (
                <p>You currently have no in-progress deliveries.</p>
            ) : (
                orders.map(order => (
                    <div key={order.id} className="product-row">
                        <div>
                            <strong>{order.customerName}</strong><br />
                            <small>Order #{order.id}</small>
                        </div>
                        <div>
                            {order.items.map((item, idx) => (
                                <div key={idx}>{item.name} × {item.quantity}</div>
                            ))}
                        </div>
                        <div>${order.totalPrice.toFixed(2)}</div>
                        <div>Status: {order.status}</div>
                        <div className="product-actions">
                            <button className="save" onClick={() => markDelivered(order.id)}>Mark Delivered</button>
                        </div>
                    </div>
                ))
            )}
        </section>
    );
};

export default InProgressTab;
