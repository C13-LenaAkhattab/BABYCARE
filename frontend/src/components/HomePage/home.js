import "./style.css"
import React from 'react'
import Navbar from '../Navbar/Navbar'
import Register from "../Register/Register"
import Login from "../Login/Login"
import MovingImages from "../MovingImages/MovingImages"
import FoodCategory from "../FoodCategory/FoodCategory"
import FeedingGuide from "../FeedingGuide/index"

const Home = () => {
  return (
<>
<Navbar/>
<MovingImages/>
{/* <Register/> */}
{/* <Login/>  */}
</>
    
  )
}

export default Home
