import React from 'react';
import './RestaurantCard.css';
import { Restaurant } from '../../../types';
import { useNavigate } from 'react-router-dom';

const RestaurantCard: React.FC<{ item: Restaurant }> = ({ item }) => {
    const navigate = useNavigate();

    return (
        <div
            className="menu-card"
            onClick={() => navigate(`/menu?restaurantId=${item.id}`)}
            style={{ cursor: 'pointer' }}
        >
            <div className="menu-card-inner no-image">
                <h3 className="menu-card-title">{item.name}</h3>
                <p className="menu-card-description">{item.address}</p>
                <p className="menu-card-location">{item.phoneNumber}</p>

            </div>
        </div>
    );
};

export default RestaurantCard;
