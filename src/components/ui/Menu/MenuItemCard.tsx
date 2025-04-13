import React from 'react';
import './MenuItemCard.css';

interface MenuItem {
    id: string;
    name: string;
    description: string;
    price: number;
    imageUrl?: string;
}

const MenuItemCard: React.FC<{ item: MenuItem }> = ({ item }) => {
    return (
        <div className="menu-card">
            <div className="menu-card-inner">
                <img
                    src={item.imageUrl || '/placeholder.jpg'}
                    alt={item.name}
                    className="menu-card-image"
                />
                <h3 className="menu-card-title">{item.name}</h3>
                <p className="menu-card-description">{item.description}</p>
                <p className="menu-card-price">${item.price.toFixed(2)}</p>
                <button className="menu-card-button">Add to cart</button>
            </div>
        </div>
    );
};

export default MenuItemCard;
