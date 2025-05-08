import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { getAllRestaurants } from '../api/restaurantApi';
import MHeader from '../components/ui/Headers/MHeader';
import RestaurantSection from '../components/ui/Restaurant/RestaurantSection';
import { Restaurant } from '../types';
import PageWrapper from '../components/ui/Other/PageWrapper.tsx';

const RestaurantsPage: React.FC = () => {
    const [restaurants, setRestaurants] = useState<Restaurant[] | null>(null);
    const [loading, setLoading] = useState(true);
    const [searchParams] = useSearchParams();
    const query = searchParams.get("query")?.toLowerCase() || "";
    const navigate = useNavigate();

    useEffect(() => {
        getAllRestaurants()
            .then(data => {
                console.log("Fetched restaurants:", data); // 👈 add this
                if (query) {
                    const filtered = data.filter(r =>
                        r.name.toLowerCase().includes(query)
                    );
                    setRestaurants(filtered);
                } else {
                    setRestaurants(data);
                }
            })
            .catch(error => {
                console.error('Failed to load restaurants:', error);
                setRestaurants(null);
            })
            .finally(() => setLoading(false));
    }, [query]);

    return (
        <div className="menu-page">
            <MHeader />
            <PageWrapper
                loading={loading}
                fallbackType={
                    !loading
                        ? restaurants === null
                            ? 'restaurant-error'
                            : restaurants.length === 0
                                ? 'restaurant-empty'
                                : null
                        : null
                }
            >
                {query && (
                    <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
                        <p>Showing results for "{query}"</p>
                        <button
                            onClick={() => navigate('/restaurants')}
                            style={{
                                padding: '0.5rem 1rem',
                                backgroundColor: '#1abc9c',
                                border: 'none',
                                color: 'white',
                                borderRadius: '0.4rem',
                                cursor: 'pointer'
                            }}
                        >
                            Clear Filter
                        </button>
                    </div>
                )}

                {restaurants && restaurants.length > 0 && (
                    <RestaurantSection items={restaurants} />
                )}
            </PageWrapper>
        </div>
    );
};

export default RestaurantsPage;
