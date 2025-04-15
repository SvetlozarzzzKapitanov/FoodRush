import React from 'react'
import './MenuItemCard.css'
import { Product } from '../../../types'

const MenuItemCard: React.FC<{ item: Product }> = ({ item }) => {
    return (
        <div className="menu-card">
            <div className="menu-card-inner">
                <img
                    src={item.imageUrl || '/Burger.jpg'}
                    alt={item.name}
                    className="menu-card-image"
                />
                <h3 className="menu-card-title">{item.name}</h3>
                <p className="menu-card-description">{item.description}</p>
                <p className="menu-card-price">${item.price.toFixed(2)}</p>
                <button className="menu-card-button">Add to cart</button>
            </div>
        </div>
    )
}

export default MenuItemCard