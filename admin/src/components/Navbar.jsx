import React from 'react'
import {assets} from "../assets/assets"
import logo from "../assets/hayaa.png"
const Navbar = ({setToken}) => {

  return (
    <div className='flex items-center py-2 px-[4%] justify-between'>
        <img className='' src={logo} alt="" />
        <button onClick={()=>setToken('')} className='bg-gray-950 text-white px-5 py-2 sm:px-7 sm:py-2 rounded-full text-xs sm:text-sm'>Logout</button>
    </div>
  )
}

export default Navbar