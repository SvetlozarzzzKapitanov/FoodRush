import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { parseJwt } from "../../../assets/parseJwt.ts";
import { Product, DeliveryOrder } from '../../../types';

const InProgressTab: React.FC = () => {
    const [orders, setOrders] = useState<DeliveryOrder[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                console.log('🧪 InProgressTab mounted');

                setLoading(true);
                const token = localStorage.getItem("token");
                const decoded = token ? parseJwt(token) : null;
                const deliveryId = decoded?.user_id;
                const res = await axios.get(`/api/orders/customer/${deliveryId}`);
                const data = res.data as DeliveryOrder[];

                const acceptedOrders = data.filter((o: DeliveryOrder) => {
                    console.log('🔍 Checking order:', {
                        id: o.id,
                        status: o.status,
                        delivery: o.delivery,
                    });
                    return (
                        o.status === 'ACCEPTED' &&
                        o.delivery?.id === deliveryId
                    );
                });

                console.log('✅ Filtered accepted orders:', acceptedOrders);
                setOrders(acceptedOrders);
            } catch (err) {
                console.error('❌ Failed to fetch in-progress orders:', err);
                setError('Failed to fetch in-progress orders.');
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    const markDelivered = async (orderId: number) => {
        try {
            const token = localStorage.getItem("token");
            const decoded = token ? parseJwt(token) : null;
            const deliveryId = decoded?.user_id;

            await axios.put(`/api/orders/delivered/${orderId}?deliveryId=${deliveryId}`);
            setOrders(prev => prev.filter(o => o.id !== orderId));
        } catch (err) {
            console.error(err);
            alert('Failed to mark order as delivered.');
        }
    };

    const groupProducts = (products: Product[]) => {
        const grouped: Record<string, number> = {};
        for (const p of products) {
            grouped[p.name] = (grouped[p.name] || 0) + 1;
        }
        return grouped;
    };

    return (
        <section className="product-management">
            <h3>Orders In Progress</h3>

            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p style={{ color: 'red' }}>{error}</p>
            ) : orders.length === 0 ? (
                <p>No accepted orders assigned to you.</p>
            ) : (
                orders.map(order => {
                    const grouped = groupProducts(order.products);
                    return (
                        <div key={order.id} className="product-row">
                            <div>
                                <strong>{order.customerName}</strong><br />
                                <small>Order #{order.id}</small>
                            </div>
                            <div>
                                {Object.entries(grouped).map(([name, qty]) => (
                                    <div key={name}>{name} × {qty}</div>
                                ))}
                            </div>
                            <div>${order.totalPrice.toFixed(2)}</div>
                            <div>Status: {order.status}</div>
                            <div className="product-actions">
                                <button className="save" onClick={() => markDelivered(order.id)}>
                                    Mark Delivered
                                </button>
                            </div>
                        </div>
                    );
                })
            )}
        </section>
    );
};

export default InProgressTab;
