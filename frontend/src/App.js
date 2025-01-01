import {React, createContext, useContext,useState } from "react";
import "./App.css";
import Home from "./components/HomePage/home";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
// import { Route, Routes, useNavigate } from "react-router-dom";

export const AppContext = createContext();

const App = () => {
  const [messageType, setMessageType] = useState("");
  const [message, setMessage] = useState("");
  const [TokenState, setTokenState] = useState(
    localStorage.getItem("Token") || "")
  const [userId, setUserId] = useState(localStorage.getItem("userId") || "");
  const [isLoggedIn, setisLoggedIn] = useState(!!TokenState);

  return (
    <AppContext.Provider value={{setMessageType,messageType, message, setMessage,TokenState,setTokenState,isLoggedIn, setisLoggedIn, setUserId,userId}}>
      <div className="App">
        <Home />
      </div>
    </AppContext.Provider>
  );
};

export default App;
