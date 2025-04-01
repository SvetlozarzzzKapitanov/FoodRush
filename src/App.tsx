import React from 'react';
import HeroSection from "./components/HeroSection.tsx";
import Header from "./components/Header.tsx";
import InfoSection from "./components/InfoSection.tsx";

const App: React.FC = () => {
    return (
        <div className="app">
            <Header>
            </Header>

            <nav className="nav">
                <a href="#">Home</a>
                <a href="#">About</a>
                <a href="#">Services</a>
                <a href="#">Contact</a>
            </nav>

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

