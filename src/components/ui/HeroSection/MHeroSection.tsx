import './MHeroSection.css';
import RadialMenu from "./RadialMenu.tsx";
import bgImage from '/src/assets/MainPage.jpg';

const MHeroSection: React.FC = () => {
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
                <div className="hero-search">
                    <input type="text" placeholder="Enter your city or address..." />
                    <button className="location-button">📍 Use my location</button>
                </div>
            </div>

            <div className="radial-wrapper">
                <RadialMenu
                    items={[
                        { label: 'Начало', icon: '🏠', to: '/' },
                        { label: 'Меню', icon: '📋', to: '/menu' },
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
