import React from 'react';
import HeroSection from "./components/HeroSection.tsx";

const App: React.FC = () => {
    return (
        <div className="app">
            <header className="header">
                <img src= "public/Logo.svg" alt="logo"></img>
                <h1>Food and Delivery</h1>
            </header>
            <nav className="nav">
                <a href="#">Home</a>
                <a href="#">About</a>
                <a href="#">Services</a>
                <a href="#">Contact</a>
            </nav>
            <>
            <HeroSection>
            </HeroSection>
            </>
            <main className="main">


            </main>
            <footer className="footer">
                <p>&copy; 2025 My Website</p>
            </footer>
        </div>
    );
};

export default App;

