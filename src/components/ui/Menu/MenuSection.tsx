import React from 'react'
import './MenuSection.css'
import MenuItemCard from './MenuItemCard'
import { Product } from '../../../types'

const MenuSection: React.FC<{ items: Product[] }> = ({ items }) => {
    return (
        <div className="menu-section">
            <h2>Menu</h2>
            <div className="menu-wrapper">
                <div className="menu-grid">
                    {items.map(item => (
                        <MenuItemCard key={item.restaurantId} item={item} />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default MenuSection