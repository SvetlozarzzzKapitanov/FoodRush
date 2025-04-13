import React from 'react';
import './MenuSection.css';
import MenuItemCard from './MenuItemCard';

interface MenuItem {
    id: string;
    name: string;
    description: string;
    price: number;
    imageUrl?: string;
}

const MenuSection: React.FC<{ items: MenuItem[] }> = ({ items }) => {
    return (
        <div className="menu-section">
            <h2>Menu</h2>
            <div className="menu-wrapper">
                <div className="menu-grid">
                    {items.map(item => (
                        <MenuItemCard key={item.id} item={item} />
                    ))}
                </div>
            </div>
        </div>

    );
};

export default MenuSection;
