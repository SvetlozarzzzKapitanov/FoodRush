import { useEffect, useState } from 'react'
import { getAllProducts } from '../api/productApi'
import MHeader from '../components/ui/Headers/MHeader'
import MenuSection from '../components/ui/Menu/MenuSection'
import { Product } from '../types'
import PageWrapper from '../components/ui/PageWrapper'
import './MenuPage.css'
import { useLocation } from 'react-router-dom';

const MenuPage: React.FC = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const restaurantId = queryParams.get('restaurantId');

    const [products, setProducts] = useState<Product[] | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getAllProducts()
            .then(data => {
                if (restaurantId) {
                    const filtered = data.filter(product => product.restaurantId === parseInt(restaurantId));
                    setProducts(filtered);
                } else {
                    setProducts(data);
                }
            })
            .catch(error => {
                console.error('Failed to load products:', error);
                setProducts(null);
            })
            .finally(() => setLoading(false));
    }, [restaurantId]);

    console.log('Products:', products);
    return (
        <div className="menu-page">
            <MHeader />
            <PageWrapper loading={loading}>
                {products && products.length > 0 ? (
                    <MenuSection items={products} />
                ) : (
                    !loading && (
                        <div className="empty-fallback">
                            <p>No products available or failed to load.</p>
                        </div>
                    )
                )}
            </PageWrapper>
        </div>
    )
}

export default MenuPage
