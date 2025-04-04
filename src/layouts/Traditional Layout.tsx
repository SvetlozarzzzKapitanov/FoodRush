import Header from "../components/ui/Headers/Header.tsx";
import InfoSection from "../components/ui/InfoSection/InfoSection.tsx";
import HeroSection from "../components/ui/HeroSection/HeroSection.tsx";

const TraditionalLayout = () => {
    return (
        <>
            <Header>
            </Header>
            <main className="main">
                <>
                    <HeroSection/>
                    <InfoSection/>
                </>
            </main>
            {/* Add more sections here later: Menu, Testimonials, Footer, etc */}
        </>
    );
};

export default TraditionalLayout;
