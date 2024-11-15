import React from 'react'
import './Navbar.css'
import { assets } from '../../../../client/src/assets/assets.js';



const Navbar = () => {
  return (
    <div className='navbar'>
        <img className='logo' src={assets.website_logo} alt="" onClick={()=>window.location.href = 'http://localhost:3000/'}/>
        <img src={assets.profile_pic} alt="" className="profile" />
    </div>
  )
}

export default Navbar