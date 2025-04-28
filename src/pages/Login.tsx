import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { loginUser } from '../api/authApi';
import MHeader from '../components/ui/Headers/MHeader';
import './Login.css';

const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const successMessage = location.state?.registered
        ? 'Successful registration! Please log in to your account.'
        : null;

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try {
            const res = await loginUser({ email, password });

            if (res.token) {
                localStorage.setItem('token', res.token);
            } else {
                console.error('Login response missing token!');
            }

            if (res.user) {
                localStorage.setItem('user', JSON.stringify(res.user));
            } else {
                console.error('Login response missing user!');
            }

            navigate('/menu');
        } catch (err: any) {
            console.error('Login error:', err);
            const backendMessage = err.response?.data?.message;
            setError(backendMessage || 'Login failed. Please check your credentials.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <MHeader />
            <div className="bg-container">
                {loading ? (
                    <div className="spinner-container">
                        <div className="spinner" />
                    </div>
                ) : (
                    <div className="login-form">
                        <h2>Login</h2>
                        {successMessage && <p className="success-message">{successMessage}</p>}
                        {error && <p className="error-message">{error}</p>}
                        <form onSubmit={handleLogin}>
                            <label htmlFor="email">E-mail</label>
                            <input
                                type="text"
                                id="email"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                placeholder="Enter e-mail"
                            />

                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter password"
                            />

                            <button type="submit">Login</button>
                        </form>
                        <p className="register-link">
                            Don’t have an account? <a href="/register">Register</a>
                        </p>
                    </div>
                )}
            </div>
        </>
    );
};

export default Login;
