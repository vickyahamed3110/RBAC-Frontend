import { Link } from "react-router-dom"
import './App.css'
import { useState } from "react"
const Homepage = () => {
    
    return(
        <>
        <div style ={{display:"flex", justifyContent:"center", alignItems:"center", height:"100vh"}}>
        <div className = "home-page"> <h1>HOMEPAGE</h1>
        <Link className="link" to="/user">User</Link>
         <Link className="link" to="/admin">Admin</Link>
        </div>
        </div>
        
        </>
    )
}

export default Homepage