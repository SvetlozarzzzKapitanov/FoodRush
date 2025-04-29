import React from 'react'
import './MenuItemCard.css'
import { Product } from '../../../types'
import { useCart } from '../Cart/CartContext'

const MenuItemCard: React.FC<{ item: Product }> = ({ item }) => {
    const { addToCart } = useCart()

    const handleAddToCart = () => {
        addToCart(item)
    }

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
                <button className="menu-card-button" onClick={handleAddToCart}>
                    Add to cart
                </button>
            </div>
        </div>
    )
}

export default MenuItemCard
