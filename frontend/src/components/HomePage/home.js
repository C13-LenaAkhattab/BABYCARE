import "./style.css"
import React from 'react'
import Navbar from '../Navbar/Navbar'
import Register from "../Register/Register"
import Login from "../Login/Login"
import MovingImages from "../MovingImages/MovingImages"
import FoodCategory from "../FoodCategory/index"

const Home = () => {
  return (
<>
<Navbar/>
<MovingImages/>
<FoodCategory/>
{/* <Register/> */}
{/* <Login/>  */}
</>
    
  )
}

export default Home
