import React, { useContext, useState } from "react";
import axios from "axios";
import { AppContext } from "../../App";
import "./Login.css";
import { Navigate } from "react-router-dom";

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

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const checkLogin = () => {
    axios
      .post(`http://localhost:5000/users/login`, { email, password })
      .then((res) => {
        setTokenState(res.data.token);
        setisLoggedIn(true);
        localStorage.setItem("Token", res.data.token);
        setUserId(localStorage.setItem("userId", res.data.userId));
        setMessage(res.data.message);
        setMessageType("success");
      })
      .catch((err) => {
        if (err.response) {
          setMessage(err.response.data.message);
          setMessageType("error");
        } else {
          setMessage("An unexpected error occurred");
          setMessageType("error");
        }
      });
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
        <h2>Login</h2>
        <input
          className="login-input"
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="login-input"
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="login-btn" onClick={checkLogin}>
          Login
        </button>
        <button
          className="google-login-btn"
          onClick={() => console.log("Google login clicked")}
        >
          <img
            src="/images/google.png"
            alt="Google"
            className="google-icon"
          />
          Login with Google
        </button>
        <p
          className={`message ${
            messageType === "success" ? "success-message" : "error-message"
          }`}
        >
          {message}
        </p>
        <p className="register-text">
          Don't have an account? <a onClick={()=>{Navigate("/Register")}} href="/register">Register</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
