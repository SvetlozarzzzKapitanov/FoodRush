import React, { useState } from 'react';
import axios from 'axios';
import { parseJwt} from "../../../assets/parseJwt.ts";


const EarningsTab: React.FC = () => {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [earnings, setEarnings] = useState<number | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const fetchEarnings = async () => {
        if (!startDate || !endDate) {
            setError('Please select both start and end dates.');
            return;
        }

        try {
            setLoading(true);
            setError('');
            const token = localStorage.getItem("token");
            const decoded = token ? parseJwt(token) : null;
            const deliveryId = decoded?.user_id;

            const res = await axios.get(`/api/orders/earnings/${deliveryId}`, {
                params: {
                    startDate: new Date(startDate).toISOString(),
                    endDate: new Date(endDate).toISOString()
                }
            });

            setEarnings(res.data as number)
        } catch (err) {
            console.error(err);
            setError('Failed to fetch earnings.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="product-management">
            <h3>My Earnings</h3>

            <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
                <label>
                    Start Date:
                    <input type="datetime-local" value={startDate} onChange={e => setStartDate(e.target.value)} />
                </label>
                <label>
                    End Date:
                    <input type="datetime-local" value={endDate} onChange={e => setEndDate(e.target.value)} />
                </label>
                <button className="save" onClick={fetchEarnings}>Get Earnings</button>
            </div>

            {loading && <p>Loading earnings...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}

            {earnings !== null && !loading && (
                <div className="product-row" style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>
                    Total Earned: ${earnings.toFixed(2)}
                </div>
            )}
        </section>
    );
};

export default EarningsTab;
