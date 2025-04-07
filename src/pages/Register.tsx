import React from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Register = () => {
    const navigate = useNavigate();
  
    const handleRegister = (e: React.FormEvent) => {
      e.preventDefault();
      navigate("/login", { state: { registered: true } });
    };
  
    return (
      <div className="bg-container">
        <div className="login-form">
          <h2>Registration</h2>
          <form onSubmit={handleRegister}>
            <label htmlFor="new-username">Username</label>
            <input type="text" id="new-username" name="new-username" placeholder="Username" />
  
            <label htmlFor="new-password">Password</label>
            <input type="password" id="new-password" name="new-password" placeholder="Password" />
  
            <button type="submit">Registration</button>
          </form>
        </div>
      </div>
    );
  };

export default Register;
