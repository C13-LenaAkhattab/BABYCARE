import "./style.css"
import React from 'react'
import Navbar from '../Navbar/Navbar'
import Register from "../Register/Register"
import Login from "../Login/Login"
import MovingImages from "../MovingImages/MovingImages"

const Home = () => {
  return (
<>
<Navbar/>
<MovingImages/>
{/* <Register/>
<Login/> */}
</>
    
  )
}

export default Home
