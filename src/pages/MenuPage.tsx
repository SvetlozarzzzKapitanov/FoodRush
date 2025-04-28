import { useEffect, useState } from 'react';
import { getAllProducts } from '../api/productApi';
import MHeader from '../components/ui/Headers/MHeader';
import MenuSection from '../components/ui/Menu/MenuSection';
import { Product } from '../types';
import PageWrapper from '../components/ui/PageWrapper';
import { useLocation } from 'react-router-dom';
import './MenuPage.css';

const MenuPage: React.FC = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const restaurantId = queryParams.get('restaurantId');

    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

    // Example hardcoded categories
    const categories = ["ALL", "BURGER", "PIZZA", "OTHER", "DESSERT", "DRINKS"];

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
                setProducts([]);
            })
            .finally(() => setLoading(false));
    }, [restaurantId]);

    // Filter products based on selected category
    const filteredProducts = selectedCategory && selectedCategory !== "ALL"
        ? products.filter(product => product.category === selectedCategory)
        : products;

    return (
        <div className="menu-page">
            <MHeader />
            <PageWrapper loading={loading}>
                <MenuSection
                    items={filteredProducts}
                    categories={categories}
                    selectedCategory={selectedCategory}
                    setSelectedCategory={setSelectedCategory}
                />
            </PageWrapper>
        </div>
    );

};

export default MenuPage;
