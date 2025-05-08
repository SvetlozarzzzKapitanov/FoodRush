import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PageWrapper from '../components/ui/Other/PageWrapper';
import MHeader from '../components/ui/Headers/MHeader';
import { parseJwt } from '../assets/parseJwt';
import axios from 'axios';
import './TrackOrderPage.css';

interface OrderProductInfoDTO {
    productName: string;
    pricePerUnit: number;
    quantity: number;
    totalPrice: number;
}

interface OrderSummaryDTO {
    products: OrderProductInfoDTO[];
    totalPrice: number;
    orderStatus: string;
}

const statusSteps = ['PENDING', 'PREPARING', 'OUT FOR DELIVERY', 'DELIVERED'];

const TrackOrderPage: React.FC = () => {
    const { orderId } = useParams<{ orderId: string }>();
    const navigate = useNavigate();
    const [order, setOrder] = useState<OrderSummaryDTO | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const token = localStorage.getItem("token") ?? "";
                const decoded = parseJwt(token);
                const customerId = decoded?.user_id;

                const res = await axios.get(`/api/orders/track/${orderId}?customerId=${customerId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                setOrder(res.data as OrderSummaryDTO)
            } catch (err) {
                console.error('Failed to fetch order:', err);
                alert('Unable to load order details.');
                navigate('/order');
            } finally {
                setLoading(false);
            }
        };

        fetchOrder();
    }, [orderId, navigate]);

    const getStepIndex = (status?: string) => {
        if (!status || typeof status !== 'string') return 0;
        return Math.max(
            0,
            statusSteps.findIndex(s => s === status.toUpperCase())
        );
    };

    return (
        <div className="menu-page">
            <MHeader />
            <PageWrapper loading={loading}>
                {order ? (
                    <div className="track-order-wrapper">
                        <h3>Order Tracking</h3>

                        <div className="status-progress-bar">
                            {statusSteps.map((step, idx) => (
                                <div
                                    key={step}
                                    className={`status-step ${idx <= getStepIndex(order.orderStatus) ? 'active' : ''}`}
                                >
                                    <div className="circle">{idx + 1}</div>
                                    <span>{step.replace(/_/g, ' ')}</span>
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
                                            = ${p.totalPrice.toFixed(2)}
                                        </span>
                                    </li>
                                ))}
                            </ul>

                            <h4 className="order-total">
                                Total: ${order.totalPrice.toFixed(2)}
                            </h4>
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
