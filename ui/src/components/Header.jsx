import React from 'react'
import "./Header.css"
import {Link, useNavigate} from "react-router-dom"


function Header({user, setUser}) {
  const navigate = useNavigate();
  return (
    <div id="header">
        <h1>1MW</h1>
        
       {user &&  <ul>
            <li><Link to="/create">Create Listing</Link></li>
            <li><Link to="/view">View Listings</Link></li>
            <li onClick={()=>{setUser(null); navigate("/")}}>Logout</li>
        </ul>}
        {!user && <ul><li><Link to="/login">Login</Link></li></ul>}
        
    </div>
  )
}

export default Header