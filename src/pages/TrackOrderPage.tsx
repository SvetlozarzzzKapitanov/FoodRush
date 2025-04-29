import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PageWrapper from '../components/ui/Other/PageWrapper';
import MHeader from '../components/ui/Headers/MHeader';
import { parseJwt } from '../assets/parseJwt';
import { fetchOrderDetails } from '../api/orderApi';
import './TrackOrderPage.css';
import { Order } from '../types';

const statusSteps = ['Pending', 'Preparing', 'Out for Delivery', 'Delivered'];

const TrackOrderPage: React.FC = () => {
    const { orderId } = useParams<{ orderId: string }>();
    const navigate = useNavigate();
    const [order, setOrder] = useState<Order | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!orderId) return;

        const load = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) throw new Error('Not logged in');
                const decoded = parseJwt(token);
                const customerId = decoded?.user_id;
                if (!customerId) throw new Error('Invalid user');

                const data = await fetchOrderDetails(Number(orderId), customerId);
                if (!data) throw new Error("Order not found or invalid response");
                console.log("🧾 Order received:", order);
                console.log("Date value received:", order.createdDate);
                setOrder(data);
            } catch (err) {
                console.error('Failed to fetch order details:', err);
                alert('Unable to load order details.');
                navigate('/order');
            } finally {
                setLoading(false);
            }
        };

        load();
    }, [orderId, navigate]);

    const getStepIndex = (status?: string) => {
        if (!status) return 0;
        return Math.max(
            0,
            statusSteps.findIndex(s => s.toLowerCase() === status.toLowerCase())
        );
    };

    return (
        <div className="menu-page">
            <MHeader />
            <PageWrapper loading={loading}>
                {order ? (
                    <div className="track-order-wrapper">
                        <h3>Order #{order.id}</h3>

                        <div className="status-progress-bar">
                            {statusSteps.map((step, idx) => (
                                <div
                                    key={step}
                                    className={`status-step ${
                                        idx <= getStepIndex(order.orderStatus) ? 'active' : ''
                                    }`}
                                >
                                    <div className="circle">{idx + 1}</div>
                                    <span>{step}</span>
                                </div>
                            ))}
                        </div>

                        <div className="order-details">
                            <h4>Items</h4>
                            <ul className="order-items">
                                {order.products.map((p, idx) => (
                                    <li key={idx} className="order-item">
                                        <span className="item-name">{p.productName}</span>
                                        <span className="item-qty">
                      {p.quantity} × ${p.pricePerUnit.toFixed(2)}
                    </span>
                                        <span className="item-total">
                      = ${p.totalProductPrice.toFixed(2)}
                    </span>
                                    </li>
                                ))}
                            </ul>

                            <h4 className="order-total">
                                Total: ${order.totalPrice.toFixed(2)}
                            </h4>

                            <p className="order-date">
                                Date:{' '}
                                {order.createdDate && !isNaN(Date.parse(order.createdDate))
                                    ? new Date(order.createdDate).toLocaleString('bg-BG', {
                                        dateStyle: 'medium',
                                        timeStyle: 'short',
                                        hour12: false,
                                    })
                                    : 'N/A'}
                            </p>

                        </div>

                        <div className="back-button-container">
                            <button className="back-button" onClick={() => navigate('/order')}>
                                Back to Orders
                            </button>
                        </div>
                    </div>
                ) : (
                    <p className="empty-message">Order not found.</p>
                )}
            </PageWrapper>
        </div>
    );
};

export default TrackOrderPage;
