import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageWrapper from '../components/ui/Other/PageWrapper';
import MHeader from '../components/ui/Headers/MHeader';
import { parseJwt } from '../assets/parseJwt';
import API from '../api/api';
import './OrderPage.css';

interface Order {
    id: number;
    status: string;
    totalPrice: number;
    createdDate: string;
}

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

                const res = await API.get<Order[]>(`/orders/customer/${customerId}`);
                setOrders(res.data);
                console.log('Order dates:', res.data.map((o: any) => o.createdAt));
                console.log('Orders:', res.data);

            } catch (err) {
                console.error('Failed to fetch orders:', err);
            }
        };

        fetchOrders();
    }, []);

    const currentOrders = orders.filter(o => !['Delivered', 'Cancelled'].includes(o.status));
    const historyOrders = orders.filter(o => ['Delivered', 'Cancelled'].includes(o.status));

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
                                Status:{' '}
                                <span className={`status-tag ${order.status.toLowerCase().replace(/ /g, '-')}`}>
                                    {order.status.toUpperCase()}
                                </span>
                            </p>
                            <p>Total: ${order.totalPrice.toFixed(2)}</p>
                            <p>
                                Date:{' '}
                                {order.createdDate
                                    ? new Date(order.createdDate).toLocaleString('bg-BG', {
                                        dateStyle: 'medium',
                                        timeStyle: 'short',
                                        hour12: false
                                    })
                                    : 'Няма информация'}
                            </p>


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