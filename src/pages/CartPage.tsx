import React from 'react'
import { useCart } from '../components/ui/Cart/CartContext'
import PageWrapper from '../components/ui/PageWrapper'
import MHeader from '../components/ui/Headers/MHeader'
import API from '../api/api'
import './MenuPage.css'
import './CartPage.css'
import { Product } from '../types'

const CartPage: React.FC = () => {
    const { cart, removeFromCart, clearCart } = useCart()

    const handlePlaceOrder = async () => {
        try {
            await API.post('/orders/create', {
                products: cart.map((p: Product) => p.id),
            })
            alert('Order placed successfully!')
            clearCart()
        } catch (err) {
            console.error(err)
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
                            {cart.map((item: Product) => (
                                <li key={item.id} className="cart-list-item">
                                    <div className="cart-item-details">
                                        <h4>{item.name}</h4>
                                        <p>{item.description}</p>
                                        <span>${item.price.toFixed(2)}</span>
                                    </div>
                                    <button className="remove-btn" onClick={() => removeFromCart(item.id)}>
                                        Remove
                                    </button>
                                </li>
                            ))}
                        </ul>
                        <h3 className="cart-total">
                            Total: ${cart.reduce((sum: number, item: Product) => sum + item.price, 0).toFixed(2)}
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
