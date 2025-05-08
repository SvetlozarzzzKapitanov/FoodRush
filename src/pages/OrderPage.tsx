import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import PageWrapper from '../components/ui/Other/PageWrapper';
import MHeader from '../components/ui/Headers/MHeader';
import { parseJwt } from '../assets/parseJwt';
import { Order } from '../types';
import './OrderPage.css';

const OrderPage: React.FC = () => {
    const navigate = useNavigate();
    const [currentTab, setCurrentTab] = useState<'current' | 'history'>('current');
    const [orders, setOrders] = useState<Order[]>([]);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) return;
                const decoded = parseJwt(token);
                const customerId = decoded?.user_id;
                if (!customerId) return;

                const res = await axios.get(`/api/orders/customer/${customerId}`);
                setOrders(res.data as Order[]);

            } catch (err) {
                if (typeof err === 'object' && err !== null && 'response' in err) {
                    const axiosError = err as { response?: { data?: any }, message?: string };
                    console.error('API error:', axiosError.response?.data || axiosError.message);
                } else {
                    console.error('Unknown error:', err);
                }

            }
        };

        fetchOrders();
    }, []);

    const currentOrders = orders.filter(o =>
        ['PENDING', 'PREPARING', 'OUT FOR DELIVERY'].includes(o.status.toUpperCase())
    );

    const historyOrders = orders.filter(o =>
        ['DELIVERED', 'CANCELLED'].includes(o.status.toUpperCase())
    );


    return (
        <div className="menu-page">
            <MHeader />
            <PageWrapper>
                <div className="order-tabs">
                    <button
                        className={`order-tab ${currentTab === 'current' ? 'active' : ''}`}
                        onClick={() => setCurrentTab('current')}
                    >
                        Current Orders
                    </button>
                    <button
                        className={`order-tab ${currentTab === 'history' ? 'active' : ''}`}
                        onClick={() => setCurrentTab('history')}
                    >
                        Order History
                    </button>
                </div>

                <div className="orders-list">
                    {(currentTab === 'current' ? currentOrders : historyOrders).map(order => (
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
                            <button className="back-button" onClick={() => navigate(`/order/track/${order.id}`)}>
                                Track Order
                            </button>
                        </div>
                    ))}

                    {(currentTab === 'current' ? currentOrders : historyOrders).length === 0 && (
                        <p className="empty-message">
                            {currentTab === 'current' ? 'You have no current orders.' : 'No order history yet.'}
                        </p>
                    )}
                </div>


                <div className="back-button-container">
                    <button className="back-button" onClick={() => navigate('/menu')}>
                        Back to Menu
                    </button>
                </div>
            </PageWrapper>
        </div>
    );
};

export default OrderPage;
