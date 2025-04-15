import React from 'react'
import { useCart } from './CartContext'
import { useNavigate, useLocation } from 'react-router-dom'
import './CartBubble.css'

const CartBubble: React.FC = () => {
    const { cart } = useCart()
    const navigate = useNavigate()
    const location = useLocation()

    const isVisible = location.pathname === '/menu' || cart.length > 0

    if (!isVisible) return null

    return (
        <div className="cart-bubble" onClick={() => navigate('/cart')}>
            {cart.length}
        </div>
    )
}

export default CartBubble