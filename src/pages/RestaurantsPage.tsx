import { useEffect, useState } from 'react';
import { getAllRestaurants } from '../api/restaurantApi';
import MHeader from '../components/ui/Headers/MHeader';
import RestaurantSection from '../components/ui/Restaurant/RestaurantSection';
import { Restaurant } from '../types';
import PageWrapper from '../components/ui/Other/PageWrapper.tsx';

const RestaurantsPage: React.FC = () => {
    const [restaurants, setRestaurants] = useState<Restaurant[] | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getAllRestaurants()
            .then(data => setRestaurants(data))
            .catch(error => {
                console.error('Failed to load restaurants:', error);
                setRestaurants(null);
            })
            .finally(() => setLoading(false));
    }, []);

    return (
        <div className="menu-page">
            <MHeader />
            <PageWrapper loading={loading}>
                {restaurants && restaurants.length > 0 ? (
                    <RestaurantSection items={restaurants} />
                ) : (
                    <div className="empty-fallback">
                        <p>No restaurants available or failed to load.</p>
                    </div>
                )}
            </PageWrapper>
        </div>
    );
}

export default RestaurantsPage;