import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Login.css";

const Login: React.FC = () => {
    const location = useLocation();
    const successMessage = location.state?.registered ? "Successful registration! Please log in to your account." : null;
    const navigate = useNavigate();

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        navigate('/');
    };
    return (
      <div className="bg-container">
        <div className="login-form">
          <h2>Вход</h2>
          {successMessage && <p className="success-message">{successMessage}</p>}
          <form onSubmit={handleLogin}>
            <label htmlFor="username">Username</label>
            <input type="text" id="username" name="username" placeholder="Enter username" />
  
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" placeholder="Enter password" />
  
            <button type="submit">Login</button>
          </form>
          <p className="register-link">
          Don't have an account? <Link to="/register">Registration</Link>
          </p>
        </div>
      </div>
    );
  };

export default Login;
