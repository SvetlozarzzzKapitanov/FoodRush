import { useEffect, useState } from 'react'
import { getAllProducts } from '../api/productApi'
import MHeader from '../components/ui/Headers/MHeader'
import MenuSection from '../components/ui/Menu/MenuSection'
import { Product } from '../types'
import PageWrapper from '../components/ui/PageWrapper'
import { useCart } from '../components/ui/Cart/CartContext'
import './MenuPage.css'

interface MenuPageProps {
    mockProducts?: Product[]
}

const MenuPage: React.FC<MenuPageProps> = ({ mockProducts }) => {
    const [products, setProducts] = useState<Product[] | null>(mockProducts || null)
    const [loading, setLoading] = useState(!mockProducts)
    const { addToCart } = useCart()

    useEffect(() => {
        if (mockProducts) return
        getAllProducts()
            .then(data => setProducts(data))
            .catch(error => {
                console.error('Failed to load products:', error)
                setProducts(null)
            })
            .finally(() => setLoading(false))
    }, [mockProducts])

    useEffect(() => {
        // Local mock test item
        addToCart({
            id: 999,
            name: 'Mock Pizza',
            price: 12.99,
            description: 'Test item for cart',
            imageUrl: '/Margherita.jpg'
        })
    }, [])

    return (
        <div className="menu-page">
            <MHeader />
            {products && Array.isArray(products) && products.length > 0 ? (
                <PageWrapper loading={loading}>
                    <MenuSection items={products} />
                </PageWrapper>
            ) : (
                <div className="empty-fallback">
                    <p>No products available or failed to load.</p>
                </div>
            )}
        </div>
    )
}

export default MenuPage
