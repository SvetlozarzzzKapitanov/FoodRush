import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MHeader from '../components/ui/Headers/MHeader';
import { registerCustomer, registerEmployee, registerDelivery } from '../api/authApi';
import './Login.css'; // can be reused
import { RegisterCredentials } from '../types'

const Register: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState<'customer' | 'employee' | 'delivery'>('customer');
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try {
            const registerFunction: (data: RegisterCredentials) => Promise<void> =
                role === 'customer'
                    ? registerCustomer
                    : role === 'employee'
                        ? registerEmployee
                        : registerDelivery;

            await registerFunction({ email, password });
            navigate('/login', { state: { registered: true } });
        } catch (err: any) {
            console.error('Registration error:', err);
            const backendMessage = err.response?.data?.message;
            setError(backendMessage || 'Registration failed. Please try again.');
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
                        <h2>Register</h2>
                        {error && <p className="error-message">{error}</p>}
                        <form onSubmit={handleRegister}>
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

                            <label htmlFor="role">Role</label>
                            <select
                                id="role"
                                value={role}
                                onChange={(e) => setRole(e.target.value as 'customer' | 'employee' | 'delivery')}
                            >
                                <option value="customer">Customer</option>
                                <option value="employee">Employee</option>
                                <option value="delivery">Delivery</option>
                            </select>

                            <button type="submit">Register</button>
                        </form>
                        <p className="register-link">
                            Already have an account? <a href="/login">Login</a>
                        </p>
                    </div>
                )}
            </div>
        </>
    );
};

export default Register;
