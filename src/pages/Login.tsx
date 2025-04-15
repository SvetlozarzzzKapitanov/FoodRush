import React, { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { loginUser } from '../api/authApi'
import MHeader from '../components/ui/Headers/MHeader'
import PageWrapper from '../components/ui/PageWrapper'
import './Login.css'

const Login: React.FC = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const location = useLocation()

    const successMessage = location.state?.registered
        ? 'Successful registration! Please log in to your account.'
        : null

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        try {
            const res = await loginUser({ username, password })
            localStorage.setItem('token', res.token)
            localStorage.setItem('user', JSON.stringify(res.user))
            navigate('/')
        } catch (err) {
            setError('Login failed. Please check your credentials.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="bg-container">
            <MHeader />
            <PageWrapper loading={loading}>
                <div className="login-form">
                    <h2>Login</h2>
                    {successMessage && <p className="success-message">{successMessage}</p>}
                    {error && <p className="error-message">{error}</p>}
                    <form onSubmit={handleLogin}>
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={e => setUsername(e.target.value)}
                            placeholder="Enter username"
                        />

                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            placeholder="Enter password"
                        />

                        <button type="submit">Login</button>
                    </form>
                    <p className="register-link">
                        Don’t have an account? <a href="/register">Register</a>
                    </p>
                </div>
            </PageWrapper>
        </div>
    )
}

export default Login