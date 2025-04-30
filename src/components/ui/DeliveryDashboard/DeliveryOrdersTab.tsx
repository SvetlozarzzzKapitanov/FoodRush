import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { parseJwt} from "../../../assets/parseJwt.ts";
import { Order} from "../../../types";

const DeliveryOrdersTab: React.FC = () => {
    const navigate = useNavigate();
    const [currentTab, setCurrentTab] = useState<'current' | 'delivered'>('current');
    const [orders, setOrders] = useState<Order[]>([]);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) return;
                const decoded = parseJwt(token);
                const deliveryId = decoded?.user_id;
                if (!deliveryId) return;

                const res = await axios.get(`/api/orders/customer/${deliveryId}`);
                setOrders(res.data);
            } catch (err) {
                console.error('Failed to fetch delivery orders:', err);
            }
        };

        fetchOrders();
    }, []);

    const currentOrders = orders.filter(o =>
        ['ACCEPTED', 'PREPARING', 'OUT FOR DELIVERY'].includes(o.status.toUpperCase())
    );

    const deliveredOrders = orders.filter(o =>
        o.status.toUpperCase() === 'DELIVERED'
    );

    return (
        <div className="menu-page">
            <div className="order-tabs">
                <button
                    className={`order-tab ${currentTab === 'current' ? 'active' : ''}`}
                    onClick={() => setCurrentTab('current')}
                >
                    In Progress
                </button>
                <button
                    className={`order-tab ${currentTab === 'delivered' ? 'active' : ''}`}
                    onClick={() => setCurrentTab('delivered')}
                >
                    Delivered
                </button>
            </div>

            <div className="orders-list">
                {(currentTab === 'current' ? currentOrders : deliveredOrders).map(order => (
                    <div key={order.id} className="order-card">
                        <h4>Order #{order.id}</h4>
                        <p>
                            Status:
                            <span className={`status-tag ${order.status.toLowerCase().replace(/\s+/g, '-')}`}>
                                {order.status}
                            </span>
                        </p>
                        <p>Total: ${order.totalPrice.toFixed(2)}</p>
                        <p>
                            Date:{' '}
                            {new Date(order.createdDate).toLocaleString('bg-BG', {
                                dateStyle: 'medium',
                                timeStyle: 'short',
                                hour12: false,
                            })}
                        </p>
                    </div>
                ))}

                {(currentTab === 'current' ? currentOrders : deliveredOrders).length === 0 && (
                    <p className="empty-message">
                        {currentTab === 'current'
                            ? 'No active deliveries right now.'
                            : 'No completed deliveries yet.'}
                    </p>
                )}
            </div>
        </div>
    );
};

export default DeliveryOrdersTab;
