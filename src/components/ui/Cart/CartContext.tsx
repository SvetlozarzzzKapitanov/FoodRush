import React, { createContext, useContext, useState } from 'react'
import { Product } from '../../../types'

interface CartContextType {
    cart: Product[]
    addToCart: (product: Product) => void
    removeFromCart: (productId: number) => void
    clearCart: () => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [cart, setCart] = useState<Product[]>([])

    const addToCart = (product: Product) => {
        setCart(prev => [...prev, product])
    }

    const removeFromCart = (productId: number) => {
        setCart(prev => prev.filter(p => p.id !== productId))
    }

    const clearCart = () => {
        setCart([])
    }

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
            {children}
        </CartContext.Provider>
    )
}

export const useCart = (): CartContextType => {
    const context = useContext(CartContext)
    if (!context) throw new Error('useCart must be used within a CartProvider')
    return context
}
