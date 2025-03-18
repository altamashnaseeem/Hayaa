import React from 'react'
import { assets } from '../assets/assets'
import sv from "../assets/hayaa.png"
const Footer = () => {
  return (
    <div className=''>
             <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm '>
               <div >
                <img src={sv} className='mb-5 w-32' alt="" />
                <p className='w-full md:w-2/3 text-gray-600'>Hayaa offers premium fashion for the modern lifestyle. Curating exclusive collections with attention to quality and design, we bring timeless elegance to your everyday wardrobe </p>
               </div>
               <div>
               <p className='text-xl font-medium mb-5'>COMPANY</p>
             <ul className='flex flex-col gap-1 text-gray-600'>
                <li>Home</li>
                <li>About Us</li>
                <li>Delivery</li>
                <li>Privacy policy</li>
                 
             </ul>
               </div>
               <div>
                <p className='text-xl font-medium mb-5 '>GET IN TOUCH</p>
                <ul className='flex flex-col gap-1 text-gray-600'>
                    <li>+917078662119</li>
                    <li>altamashnaseem7@gmail.com</li>
                </ul>
               </div>

             </div>
             <div>
                <hr />
                <p className='py-5 text-sm text-center'>Copyright 2025@ Hayaa.com - All Right Reserved.</p>
             </div>
            
    </div>

  )
}

export default Footer