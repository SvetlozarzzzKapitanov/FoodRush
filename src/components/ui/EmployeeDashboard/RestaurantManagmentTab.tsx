import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ProductManagmentTab.css';

interface Restaurant {
    id: number;
    name: string;
    address: string;
    phoneNumber: string;
}

const RestaurantManagementTab: React.FC = () => {
    const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
    const [editId, setEditId] = useState<number | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetch = async () => {
            try {
                const res = await axios.get('/api/restaurants');
                setRestaurants(res.data);
            } catch (err) {
                console.error('Failed to fetch restaurants:', err);
            } finally {
                setLoading(false);
            }
        };

        fetch();
    }, []);

    const handleUpdate = async (restaurant: Restaurant) => {
        try {
            const res = await axios.put(`/api/restaurants/${restaurant.id}`, restaurant);
            setRestaurants(prev =>
                prev.map(r => (r.id === restaurant.id ? res.data : r))
            );
            setEditId(null);
        } catch (err) {
            console.error('Update failed', err);
            alert('Failed to update restaurant.');
        }
    };

    if (loading) return <p>Loading restaurants...</p>;

    return (
        <section className="product-management">
            <h3>Restaurant Management</h3>

            {restaurants.map(r => (
                <div key={r.id} className="product-row">
                    {editId === r.id ? (
                        <>
                            <input
                                value={r.name}
                                onChange={e => setRestaurants(prev => prev.map(x => x.id === r.id ? { ...x, name: e.target.value } : x))}
                            />
                            <input
                                value={r.address}
                                onChange={e => setRestaurants(prev => prev.map(x => x.id === r.id ? { ...x, address: e.target.value } : x))}
                            />
                            <input
                                value={r.phoneNumber}
                                onChange={e => setRestaurants(prev => prev.map(x => x.id === r.id ? { ...x, phoneNumber: e.target.value } : x))}
                            />
                            <div className="product-actions">
                                <button className="save" onClick={() => handleUpdate(r)}>Save</button>
                                <button className="delete" onClick={() => setEditId(null)}>Cancel</button>
                            </div>
                        </>
                    ) : (
                        <>
                            <div>{r.name}</div>
                            <div>{r.address}</div>
                            <div>{r.phoneNumber}</div>
                            <div className="product-actions">
                                <button className="edit" onClick={() => setEditId(r.id)}>Edit</button>
                            </div>
                        </>
                    )}
                </div>
            ))}
        </section>
    );
};

export default RestaurantManagementTab;
