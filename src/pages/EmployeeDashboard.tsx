import React, { useEffect, useState } from 'react';
import MHeader from '../components/ui/Headers/MHeader';
import PageWrapper from '../components/ui/Other/PageWrapper';
import './EmployeeDashboard.css';
import { Restaurant } from '../types';
import { getAllRestaurants } from '../api/restaurantApi';
import ProductManagementTab from "../components/ui/EmployeeDashboard/ProductManagmentTab.tsx";
import PendingOrdersTab from "../components/ui/EmployeeDashboard/PendingOrdersTab.tsx";
import RestaurantManagementTab from "../components/ui/EmployeeDashboard/RestaurantManagmentTab.tsx";
import RevenueTab from "../components/ui/EmployeeDashboard/RevenueTab.tsx";

const tabs = ['Orders', 'Products', 'Restaurant', 'Revenue'] as const;
type Tab = typeof tabs[number];

const EmployeeDashboard: React.FC = () => {
    const [activeTab, setActiveTab] = useState<Tab>('Orders');
    const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState<string[]>([]);
    const [restaurantId, setRestaurantId] = useState<number | null>(null);

    useEffect(() => {
        getAllRestaurants()
            .then(setRestaurants)
            .catch(err => console.error('Failed to load restaurants:', err));
    }, []);

    return (
        <div className="menu-page">
            <MHeader />
            <PageWrapper loading={false}>
                <div className="employee-dashboard-wrapper">
                    <h2>Employee Dashboard</h2>

                    <div className="restaurant-selector">
                        <input
                            type="text"
                            placeholder="Search for your restaurant..."
                            value={query}
                            onChange={(e) => {
                                const value = e.target.value;
                                setQuery(value);
                                const matches = restaurants
                                    .filter(r => r.name.toLowerCase().includes(value.toLowerCase()))
                                    .map(r => r.name)
                                    .slice(0, 5);
                                setSuggestions(matches);
                            }}
                        />
                        {suggestions.length > 0 && (
                            <ul className="search-suggestions">
                                {suggestions.map((name, index) => (
                                    <li
                                        key={index}
                                        onClick={() => {
                                            const match = restaurants.find(r => r.name === name);
                                            if (match) {
                                                setRestaurantId(match.id);
                                                setQuery(match.name);
                                                setSuggestions([]);
                                            }
                                        }}
                                    >
                                        {name}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>

                    <div className="admin-tabs">
                        {tabs.map(tab => (
                            <button
                                key={tab}
                                className={activeTab === tab ? 'active' : ''}
                                onClick={() => setActiveTab(tab)}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>

                    <div className="admin-tab-content">
                        {activeTab === 'Products' && (
                            restaurantId ? <ProductManagementTab restaurantId={restaurantId} /> : <p>Select a restaurant to manage products.</p>
                        )}
                        {activeTab === 'Orders' && (
                            restaurantId ? <PendingOrdersTab restaurantId={restaurantId} /> : <p>Select a restaurant to view orders.</p>
                        )}
                        {activeTab === 'Restaurant' && <RestaurantManagementTab />}
                        {restaurantId !== null && (
                            <RevenueTab restaurantId={restaurantId} />
                        )}
                    </div>
                </div>
            </PageWrapper>
        </div>
    );
};

export default EmployeeDashboard;
