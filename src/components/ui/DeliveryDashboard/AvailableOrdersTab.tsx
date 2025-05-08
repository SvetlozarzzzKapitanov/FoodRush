import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { parseJwt} from "../../../assets/parseJwt.ts";
import { Order, OrderItem } from '../../../types';

const AvailableOrdersTab: React.FC = () => {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                setLoading(true);
                const res = await axios.get('/api/orders/pending');
                setOrders(res.data as Order[]);
            } catch (err) {
                console.error(err);
                setError('Failed to fetch available orders.');
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    const handleAccept = async (orderId: number) => {
        try {
            const token = localStorage.getItem("token");
            const decoded = token ? parseJwt(token) : null;
            const deliveryId = decoded?.user_id;

            await axios.post(`/api/orders/accept/${orderId}?deliveryId=${deliveryId}`);
            setOrders(prev => prev.filter(o => o.id !== orderId));
        } catch (err) {
            console.error(err);
            alert('Failed to accept order.');
        }
    };

    return (
        <section className="product-management">
            <h3>Available Orders for Delivery</h3>

            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p style={{ color: 'red' }}>{error}</p>
            ) : orders.length === 0 ? (
                <p>No available orders at the moment.</p>
            ) : (
                orders.map(order => (
                    <div key={order.id} className="product-row">
                        <div>
                            <strong>{order.customerName}</strong><br />
                            <small>Order #{order.id}</small>
                        </div>
                        <div>
                            {order.items?.map((item: OrderItem, idx: number) => (
                                <div key={idx}>
                                    <p>{item.productName} x {item.quantity}</p>
                                    <p>Price: ${item.price}</p>
                                </div>
                            ))}

                        </div>
                        <div>${order.totalPrice.toFixed(2)}</div>
                        <div>Status: {order.status}</div>
                        <div className="product-actions">
                            <button className="save" onClick={() => handleAccept(order.id)}>Accept</button>
                        </div>
                    </div>
                ))
            )}
        </section>
    );
};

export default AvailableOrdersTab;
