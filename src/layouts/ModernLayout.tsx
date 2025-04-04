import ModernHeader from "../components/ui/Headers/MHeader.tsx";
import MHeroSection from "../components/ui/HeroSection/MHeroSection.tsx";

const ModernLayout = () => {
    return (
        <div style={{ position: 'relative', minHeight: '100vh' }}>
            <ModernHeader />
            <MHeroSection />

        </div>
    );
};

export default ModernLayout;
