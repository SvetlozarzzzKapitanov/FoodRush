import './MHeroSection.css';
import RadialMenu from "./RadialMenu.tsx";
import bgImage from '/src/assets/MainPage.jpg';
import { useNavigate } from 'react-router-dom';
import { getAllRestaurants} from "../../../api/restaurantApi.ts";
import { useEffect, useState } from 'react';
import { Restaurant } from '../../../types';

const MHeroSection: React.FC = () => {
    const [query, setQuery] = useState('');
    const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
    const [suggestions, setSuggestions] = useState<string[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        getAllRestaurants()
            .then(data => setRestaurants(data))
            .catch(err => console.error("Грешка при зареждане на ресторанти:", err));
    }, []);

    const handleHeroSearch = () => {
        if (!query.trim()) {
            alert("Моля, въведете име на ресторант.");
            return;
        }
        navigate(`/restaurants?query=${encodeURIComponent(query)}`);
    };

    const handleInputChange = (value: string) => {
        setQuery(value);
        const matches = restaurants
            .filter(r => r.name.toLowerCase().includes(value.toLowerCase()))
            .map(r => r.name)
            .slice(0, 5);
        setSuggestions(matches);
    };

    const handleSuggestionClick = (name: string) => {
        const match = restaurants.find(r => r.name === name);
        if (match) {
            navigate(`/menu?restaurantId=${match.id}`);
        }
    };

    return (
        <section
            className="hero-modern"
            style={{ backgroundImage: `url(${bgImage})` }}
        >
            <div className="hero-content">
                <div className="hero-text-box">
                    <h1>Food delivery made fun</h1>
                    <p>Find restaurants, groceries, and more in your city.</p>
                </div>
                <div className="hero-search-with-dropdown">
                    <input
                        type="text"
                        placeholder="Enter a restaurant name..."
                        value={query}
                        onChange={(e) => handleInputChange(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleHeroSearch()}
                    />
                    <button className="location-button" onClick={handleHeroSearch}>
                        🔍 Search
                    </button>
                    {suggestions.length > 0 && (
                        <ul className="search-suggestions">
                            {suggestions.map((name, index) => (
                                <li key={index} onClick={() => handleSuggestionClick(name)}>
                                    {name}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>

            <div className="radial-wrapper">
                <RadialMenu
                    items={[
                        { label: 'Начало', icon: '🏠', to: '/' },
                        { label: 'Меню', icon: '📋', to: '/restaurants' },
                        { label: 'За нас', icon: 'ℹ️', to: '/about' },
                        { label: 'Контакти', icon: '📞', to: '/contact' },
                        { label: 'Вход', icon: '🔐', to: '/login' },
                    ]}
                />
            </div>
        </section>
    );
};

export default MHeroSection;
