import React from 'react';
import './RestaurantSection.css';
import RestaurantCard from './RestaurantCard';
import { Restaurant } from '../../../types';

const RestaurantSection: React.FC<{ items: Restaurant[] }> = ({ items }) => {
    return (
        <div className="menu-section">
            <h2>Restaurants</h2>
            <div className="menu-wrapper">
                <div className="menu-grid">
                    {items.map(restaurant => (
                        <RestaurantCard key={restaurant.id} item={restaurant} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default RestaurantSection;
