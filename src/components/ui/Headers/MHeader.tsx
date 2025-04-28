import React, { useEffect, useState } from 'react';
import './MHeader.css';
import { Link, useNavigate } from 'react-router-dom';

const ModernHeader: React.FC = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        setIsLoggedIn(!!token);

        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setIsLoggedIn(false);
        navigate('/login');
    };

    return (
        <header className={`modern-header ${isScrolled ? 'scrolled' : ''}`}>
            <div className="header-left" /> {/* Empty, for symmetry */}

            <Link to="/" className="brand" style={{ textDecoration: 'none' }}>
                <div className="logo-wrapper">
                    <div className="logo-inner">
                        <img src="Logo.svg" alt="Logo" />
                    </div>
                </div>
                <span className="company-name">FoodRush</span>
            </Link>

            <div className="header-right">
                {isLoggedIn ? (
                    <>
                        <button className="login-button" onClick={() => navigate('/profile')}>Profile</button>
                        <button className="register-button" onClick={handleLogout}>Logout</button>
                    </>
                ) : (
                    <>
                        <Link to="/login">
                            <button className="login-button">Login</button>
                        </Link>
                        <Link to="/register">
                            <button className="register-button">Register</button>
                        </Link>
                    </>
                )}
            </div>
        </header>
    );
};

export default ModernHeader;
