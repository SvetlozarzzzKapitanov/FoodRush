import Header from "../components/Header.tsx";
import InfoSection from "../components/InfoSection.tsx";
import HeroSection from "../components/HeroSection.tsx";

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
