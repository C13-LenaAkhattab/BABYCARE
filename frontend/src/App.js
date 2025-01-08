import { React, createContext, useContext, useState } from "react";
import "./App.css";
import Home from "./components/HomePage/home";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { Route, Routes, useNavigate } from "react-router-dom";
import FoodCategory from "./components/FoodCategory/FoodCategory";
import Login from "./components/Login/Login";
import Navbar from "./components/Navbar/Navbar"
import Stage1 from "./components/FoodStage/Stage1";
import Stage2 from "./components/FoodStage/Stage2";
import Stage3 from "./components/FoodStage/Stage3";
import Register from "./components/Register/Register"


export const AppContext = createContext();

const App = () => {
  const [messageType, setMessageType] = useState("");
  const [message, setMessage] = useState("");
  const [TokenState, setTokenState] = useState(
    localStorage.getItem("Token") || ""
  );
  const [userId, setUserId] = useState(localStorage.getItem("userId") || "");
  const [isLoggedIn, setisLoggedIn] = useState(!!TokenState);
  const [CategoryName, setCategoryName] = useState("");
  const navigate = useNavigate();

  return (
    <AppContext.Provider
      value={{
        setMessageType,
        messageType,
        message,
        setMessage,
        TokenState,
        setTokenState,
        isLoggedIn,
        setisLoggedIn,
        setUserId,
        userId,
        CategoryName,
        setCategoryName,
      }}
    >
      <div className="App">
        <Navbar/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/FoodCategory" element={<FoodCategory />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Stage1" element={<Stage1 />} />
          <Route path="/Stage2" element={<Stage2 />} />
          <Route path="/Stage3" element={<Stage3 />} />
          <Route path="/Register" element={<Register />} />


          


        </Routes>
      </div>
    </AppContext.Provider>
  );
};

export default App;
