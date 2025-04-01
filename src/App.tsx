import React from 'react';

const App: React.FC = () => {
    return (
        <div className="app">
            <header className="header">
                <img src= "public/Logo.svg" alt="logo"></img>
                <h1>Welcome to Greenery</h1>
                <h1>Food and Delivery</h1>
            </header>
            <nav className="nav">
                <a href="#">Home</a>
                <a href="#">About</a>
                <a href="#">Services</a>
                <a href="#">Contact</a>
            </nav>
            <main className="main">
                <div>
                    <img src= "public/MainPage.jpg" alt="food"></img>
                    <h2>Welcome</h2>
                    <p>This is where your world of food expands!</p>
                </div>

            </main>
            <footer className="footer">
                <p>&copy; 2025 My Website</p>
            </footer>
        </div>
    );
};

export default App;

