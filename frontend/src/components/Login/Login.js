import {React, createContext, useContext, useState } from 'react'
import axios from 'axios'
// import { useNavigate } from "react-router-dom";
import { AppContext } from "../../App";

const Login = () => {
    const {message, setMessage,TokenState,setTokenState,isLoggedIn, setisLoggedIn, setUserId,userId, setMessageType,messageType}=useContext(AppContext)

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    const checkLogin=()=>{
        axios
        .post(`http://localhost:5000/users/login` , {email , password})
        .then((res)=>{
        setTokenState(res.data.token)
        setisLoggedIn(true)
        localStorage.setItem('Token', res.data.token)
        setUserId(localStorage.setItem("userId", res.data.userId))
        setMessage(res.data.message);
        setMessageType("success");
        })
        .catch((err)=>{
            if (err.response) {
                setMessage(err.response.data.message);
                setMessageType("error");
              } else {
                setMessage("An unexpected error occurred");
                setMessageType("error");
              }
        })
    }
   
  return (
    <>
    <div className="Login">
      <h1>Login</h1>
      <input
        className="email"
        type="email"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      ></input>
      <input
        className="password"
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      ></input>

      <button onClick={checkLogin}>Login</button>
      <p className={`SuccessfulMessage ${messageType === "success" ? "success-message" : messageType === "error" ? "error-message" : ""}`}>
        {message}
      </p>
    </div>
  </>
  )
}

export default Login