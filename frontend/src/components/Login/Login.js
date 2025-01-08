import React, { useContext, useState } from "react";
import axios from "axios";
import { AppContext } from "../../App";
import "./Login.css";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const {
    message,
    setMessage,
    TokenState,
    setTokenState,
    isLoggedIn,
    setisLoggedIn,
    setUserId,
    setMessageType,
    messageType,
  } = useContext(AppContext);

  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const checkLogin = async (e) => {
    e.preventDefault(); 
    try {
      const res = await axios.post(`http://localhost:5000/users/login`, {
        email,
        password,
      });
      
      setTokenState(res.data.token);
      setisLoggedIn(true);
      localStorage.setItem("Token", res.data.token);
      localStorage.setItem("userId", res.data.userId);
      setUserId(res.data.userId);
      setMessage(res.data.message);
      setMessageType("success");
      
      setTimeout(() => {
        navigate("/");
      }, 1500);
    } catch (err) {
      if (err.response) {
        setMessage(err.response.data.message);
        setMessageType("error");
      } else {
        setMessage("An unexpected error occurred");
        setMessageType("error");
      }
    }
  };
  return (
    <div className="login-container">
      <div className="login-card">
        <div className="icon-container">
          <img
            src="/images/parenting.png"
            alt="Parent Icon"
            className="parent-icon"
          />
        </div>
        <h2>Welcome Back</h2>
        <p className="subtitle">Please enter your details to sign in</p>
        <form onSubmit={checkLogin}>
          <input
            className="login-input"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            className="login-input"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="login-btn">
            Sign In
          </button>
        </form>
        
        <div className="divider">
          <span>or continue with</span>
        </div>
        
        <button
          className="google-login-btn"
          onClick={() => console.log("Google login clicked")}
        >
          <img
            src="/images/google.png"
            alt="Google"
            className="google-icon"
          />
          Google
        </button>
        
        {message && (
          <p
            className={`message ${
              messageType === "success" ? "success-message" : "error-message"
            }`}
          >
            {message}
          </p>
        )}
        
        <p className="register-text">
          Don't have an account?{" "}
          <a onClick={() => navigate("/Register")}>Create account</a>
        </p>
      </div>
    </div>
  );
};

export default Login;