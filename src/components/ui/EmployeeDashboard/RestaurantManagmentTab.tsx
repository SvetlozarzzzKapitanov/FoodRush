import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ProductManagmentTab.css';
import './RestaurantManagmentTab.css'

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
    const [newRestaurant, setNewRestaurant] = useState({
        name: '',
        address: '',
        phoneNumber: ''
    });

    useEffect(() => {
        const fetch = async () => {
            try {
                const res = await axios.get('/api/restaurants');
                setRestaurants(res.data as Restaurant[]);
            } catch (err) {
                console.error('Failed to fetch restaurants:', err);
            } finally {
                setLoading(false);
            }
        };

        fetch();
    }, []);
    const handleAddRestaurant = async () => {
        try {
            const res = await axios.post('/api/restaurants', newRestaurant);
            const newRestaurants = res.data as Restaurant[];
            setRestaurants(prev => [...prev, ...newRestaurants]);
            setNewRestaurant({ name: '', address: '', phoneNumber: '' });
        } catch (err) {
            console.error('Failed to create restaurant:', err);
            alert('Could not create restaurant.');
        }
    };

    const handleUpdate = async (restaurant: Restaurant) => {
        try {
            const res = await axios.put(`/api/restaurants/${restaurant.id}`, restaurant);
            setRestaurants(prev =>
                prev.map(r => (r.id === restaurant.id ? res.data as Restaurant : r))
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
            <div className="add-restaurant-form">
                <input
                    type="text"
                    placeholder="Name"
                    value={newRestaurant.name}
                    onChange={e => setNewRestaurant(prev => ({ ...prev, name: e.target.value }))}
                />
                <input
                    type="text"
                    placeholder="Address"
                    value={newRestaurant.address}
                    onChange={e => setNewRestaurant(prev => ({ ...prev, address: e.target.value }))}
                />
                <input
                    type="text"
                    placeholder="Phone Number"
                    value={newRestaurant.phoneNumber}
                    onChange={e => setNewRestaurant(prev => ({ ...prev, phoneNumber: e.target.value }))}
                />
                <button className="save" onClick={handleAddRestaurant}>Add</button>
            </div>


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
