import React, { useState, useMemo, useEffect, useRef } from 'react'
import { useCart } from './CartContext'
import { useNavigate, useLocation } from 'react-router-dom'
import './CartBubble.css'

interface PlusOne {
    id: number
}

const CartBubble: React.FC = () => {
    const { cart } = useCart()
    const navigate = useNavigate()
    const location = useLocation()

    const [plusOnes, setPlusOnes] = useState<PlusOne[]>([])

    const cartItemCount = cart.length
    const cartTotalPrice = cart.reduce((sum, item) => sum + item.price, 0)
    const prevCartItemCount = useRef(cartItemCount)

    const isDisabled = cartItemCount === 0

    const isVisible = useMemo(() => {
        return location.pathname === '/menu' || cartItemCount > 0
    }, [location.pathname, cartItemCount])

    useEffect(() => {
        if (cartItemCount > prevCartItemCount.current) {
            // Item was added ➔ spawn +1
            setPlusOnes(prev => [...prev, { id: Date.now() + Math.random() }])
        }
        prevCartItemCount.current = cartItemCount
    }, [cartItemCount])

    if (!isVisible) return null

    return (
        <div className="cart-bubble-wrapper">
            {plusOnes.map((plusOne) => {
                const sway = Math.random() * 40 - 20; // -20px to +20px
                return (
                    <span
                        key={plusOne.id}
                        className="plus-one-floating"
                        style={{
                            '--sway': `${sway}px`
                        } as React.CSSProperties}
                    >
            +1
        </span>
                )
            })}
            <div
                className={`cart-bubble ${isDisabled ? 'disabled' : ''}`}
                onClick={() => {
                    if (!isDisabled) navigate('/cart')
                }}
            >
                <div>{cartItemCount}</div>
                {!isDisabled && (
                    <div className="cart-bubble-price">${cartTotalPrice.toFixed(2)}</div>
                )}
            </div>
        </div>
    )
}

export default CartBubble
