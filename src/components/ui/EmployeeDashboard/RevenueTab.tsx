import React, { useState } from 'react';
import axios from 'axios';
import './ProductManagmentTab.css'; // reuse styling
import {Props} from "../../../types";

const RevenueTab: React.FC<Props> = ({ restaurantId }) => {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [revenue, setRevenue] = useState<number | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const fetchRevenue = async () => {
        if (!restaurantId) {
            setError('Please select a restaurant first.');
            return;
        }

        if (!startDate || !endDate) {
            setError('Please select a start and end date.');
            return;
        }

        try {
            setLoading(true);
            setError('');
            const res = await axios.get(`/api/orders/revenue`, {
                params: {
                    restaurantId,
                    startDate: new Date(startDate).toISOString(),
                    endDate: new Date(endDate).toISOString(),
                }
            });
            setRevenue(res.data);
        } catch (err) {
            console.error(err);
            setError('Failed to fetch revenue.');
        } finally {
            setLoading(false);
        }
    };


    return (
        <section className="product-management">
            <h3>Restaurant Revenue</h3>

            <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
                <label>
                    Start Date:
                    <input type="datetime-local" value={startDate} onChange={e => setStartDate(e.target.value)} />
                </label>
                <label>
                    End Date:
                    <input type="datetime-local" value={endDate} onChange={e => setEndDate(e.target.value)} />
                </label>
                <button
                    className="save"
                    onClick={fetchRevenue}
                    disabled={!restaurantId}
                >
                    Get Revenue
                </button>

            </div>

            {loading && <p>Loading revenue...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}

            {revenue !== null && !loading && (
                <div className="product-row" style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>
                    Total Revenue: ${revenue.toFixed(2)}
                </div>
            )}
        </section>
    );
};

export default RevenueTab;
