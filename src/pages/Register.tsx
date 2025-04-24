import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { registerUser } from '../api/authApi'
import MHeader from '../components/ui/Headers/MHeader'
import PageWrapper from '../components/ui/PageWrapper'
import './Login.css'

const Register: React.FC = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        try {
            await registerUser({ username, password })
            navigate('/login', { state: { registered: true } })
        } catch (err) {
            setError('Registration failed. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="bg-container">
            <MHeader />
            <PageWrapper loading={loading}>
                <div className="login-form">
                    <h2>Register</h2>
                    {error && <p className="error-message">{error}</p>}
                    <form onSubmit={handleRegister}>
                        <label htmlFor="username">E-mail</label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={e => setUsername(e.target.value)}
                            placeholder="Enter e-mail"
                        />

                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            placeholder="Enter password"
                        />

                        <button type="submit">Register</button>
                    </form>
                    <p className="register-link">
                        Already have an account? <a href="/login">Login</a>
                    </p>
                </div>
            </PageWrapper>
        </div>
    )
}

export default Register