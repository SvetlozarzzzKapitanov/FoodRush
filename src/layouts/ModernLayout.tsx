import HeroSection from "../components/HeroSection.tsx";
import RadialMenu from "../components/RadialMenu.tsx";

const ModernLayout = () => {
    return (
        <div style={{ position: 'relative', minHeight: '100vh' }}>
            <HeroSection />

            <RadialMenu>
                <div className="radial-bubble">
                    <div className="bubble-icon">🏠</div>
                    <div className="bubble-label">Home</div>
                </div>
                <div className="radial-bubble">
                    <div className="bubble-icon">📋</div>
                    <div className="bubble-label">Menu</div>
                </div>
                <div className="radial-bubble">
                    <div className="bubble-icon">🍽️</div>
                    <div className="bubble-label">Restaurants</div>
                </div>
                <div className="radial-bubble">
                    <div className="bubble-icon">ℹ️</div>
                    <div className="bubble-label">About</div>
                </div>
                <div className="radial-bubble">
                    <div className="bubble-icon">📞</div>
                    <div className="bubble-label">Contact</div>
                </div>
            </RadialMenu>
        </div>
    );
};

export default ModernLayout;
