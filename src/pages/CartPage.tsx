import React from 'react'
import { useCart } from '../components/ui/Cart/CartContext'
import PageWrapper from '../components/ui/Other/PageWrapper'
import MHeader from '../components/ui/Headers/MHeader'
import './MenuPage.css'
import './CartPage.css'
import { Product } from '../types'
import { useNavigate } from 'react-router-dom'
import { parseJwt } from '../assets/parseJwt'
import { createOrder } from '../api/orderApi'

const CartPage: React.FC = () => {
    const { cart, removeFromCart, clearCart } = useCart()
    const navigate = useNavigate()

    const groupedCart = cart.reduce((acc: { [key: number]: { product: Product, quantity: number } }, item: Product) => {
        if (acc[item.id]) {
            acc[item.id].quantity += 1;
        } else {
            acc[item.id] = { product: item, quantity: 1 };
        }
        return acc;
    }, {});

    const handlePlaceOrder = async () => {
        try {
            const token = localStorage.getItem('token')
            if (!token) {
                alert('You must be logged in to place an order.')
                return
            }

            const decoded = parseJwt(token)
            const customerId = decoded?.user_id

            if (!customerId) {
                alert('Could not extract customer ID from token.')
                return
            }

            const productIds = cart.map((p: Product) => p.id)

            await createOrder(customerId, productIds)

            clearCart()
            navigate('/order')
        } catch (err) {
            console.error('Failed to place order:', err)
            alert('Failed to place order.')
        }
    }

    return (
        <div className="menu-page">
            <MHeader />
            <PageWrapper>
                <h2 className="cart-title">Your Cart</h2>
                {cart.length === 0 ? (
                    <div className="cart-empty">
                        <p>Your cart is empty.</p>
                    </div>
                ) : (
                    <div className="cart-list-wrapper">
                        <ul className="cart-list">
                            {Object.values(groupedCart).map(({ product, quantity }) => (
                                <li key={product.id} className="cart-list-item">
                                    <div className="cart-item-details">
                                        <h4>{product.name}</h4>
                                        <p>{product.description}</p>
                                        <span>
                                            {quantity} × ${product.price.toFixed(2)} = ${(product.price * quantity).toFixed(2)}
                                        </span>
                                    </div>
                                    <button className="remove-btn" onClick={() => removeFromCart(product.id)}>
                                        Remove
                                    </button>
                                </li>
                            ))}
                        </ul>
                        <h3 className="cart-total">
                            Total: ${Object.values(groupedCart)
                            .reduce((sum, { product, quantity }) => sum + product.price * quantity, 0)
                            .toFixed(2)}
                        </h3>
                        <div className="place-order-container">
                            <button className="place-order-btn" onClick={handlePlaceOrder}>
                                Place Order
                            </button>
                        </div>
                    </div>
                )}
            </PageWrapper>
        </div>
    )
}

export default CartPage
