import {React, createContext, useContext,useState } from "react";
import "./App.css";
import Home from "./components/HomePage/home";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { Route, Routes, useNavigate } from "react-router-dom";
import FoodCategory from "./components/FoodCategory";
import Login from "./components/Login/Login";

export const AppContext = createContext();

const App = () => {
  const [messageType, setMessageType] = useState("");
  const [message, setMessage] = useState("");
  const [TokenState, setTokenState] = useState(
    localStorage.getItem("Token") || "")
  const [userId, setUserId] = useState(localStorage.getItem("userId") || "");
  const [isLoggedIn, setisLoggedIn] = useState(!!TokenState);
  const [CategoryName , setCategoryName]=useState("")
  const navigate = useNavigate();



  return (
    <AppContext.Provider value={{setMessageType,messageType, message, setMessage,TokenState,setTokenState,isLoggedIn, setisLoggedIn, setUserId,userId,CategoryName , setCategoryName}}>
      <div className="App">
        <Home />
      
      <Routes>
      <Route path="/Food" element={<FoodCategory/>} /> 
      <Route path="/Login" element={<Login/>} /> 

      </Routes>
      </div>
    </AppContext.Provider>
  )
};

export default App;
