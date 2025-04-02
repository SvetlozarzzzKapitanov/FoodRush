import React from 'react';
import HeroSection from "./components/HeroSection.tsx";
import Header from "./components/Header.tsx";
import InfoSection from "./components/InfoSection.tsx";

const App: React.FC = () => {
    return (
        <div className="app">
            <Header>
            </Header>
            <main className="main">
                <>
                    <HeroSection/>
                    <InfoSection/>
                </>
            </main>
            <footer className="footer">
                <p>&copy; 2025 My Website</p>
            </footer>
        </div>
    );
};

export default App;

