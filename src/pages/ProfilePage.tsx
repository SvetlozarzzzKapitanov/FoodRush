import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PageWrapper from '../components/ui/Other/PageWrapper.tsx';
import MHeader from '../components/ui/Headers/MHeader';
import './ProfilePage.css';

interface User {
    email: string;
    [key: string]: any;
}

const ProfilePage: React.FC = () => {
    const [user, setUser] = useState<User | null>(null);
    const [activeTab, setActiveTab] = useState<'settings'>('settings');
    const navigate = useNavigate();

    useEffect(() => {
        try {
            const userData = localStorage.getItem('user');
            if (userData) {
                const parsedUser = JSON.parse(userData);
                setUser(parsedUser);
            } else {
                navigate('/login'); // No user found, force login
            }
        } catch (error) {
            console.error('Failed to parse user:', error);
            navigate('/login'); // Parsing failed, treat as not logged in
        }
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
    };

    return (
        <div className="profile-page">
            <MHeader />
            <PageWrapper loading={false}>
                <div className="profile-container">
                    <h2>Welcome, {user?.email}</h2>

                    <div className="profile-tabs">
                        <button
                            className={activeTab === 'settings' ? 'active' : ''}
                            onClick={() => setActiveTab('settings')}
                        >
                            Settings
                        </button>
                    </div>

                    <div className="profile-content">
                        {activeTab === 'settings' && (
                            <div className="settings-section">
                                <h3>Account Settings</h3>
                                <p>Stuff</p>
                                <button className="logout-button" onClick={handleLogout}>
                                    Logout
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </PageWrapper>
        </div>
    );
};

export default ProfilePage;
