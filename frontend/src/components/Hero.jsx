// import React from 'react'
// import { assets } from '../assets/assets'
// import sv from "../assets/banner1.png"
// const Hero = () => {
//   return (
//     <div className='flex flex-col sm:flex-row border border-gray-400'>
//         {/* hero left side */}
//         <div className='w-full sm:w-1/2 flex items-center justify-center py-10 sm:py-0'>
//            <div className='text-[#414141]'>
//              <div className='flex items-center gap-2'>
//                 <p className='w-8 md:w-11 h-[2px] bg-[#414141]'> </p>
//                 <p className='font-medium text-sm md:text-base' >OUR BEST SELLER</p>
//              </div>
//              <h1 className='prate-regular text-3xl sm:py-3 lg:text-5xl leading-relaxed '>Latest Arrivals</h1>
//              <div className='flex items-center gap-2'>
//                   <p className='font-semibold text-sm md:text-base'>SHOP NOW</p>
//                   <p className='w-8 md:w-11 h-[2px] bg-[#414141]'></p>
//              </div>
//            </div>
//         </div>
//         {/* HERO RIGHT SIDE */}
//         <img src={sv} className='w-full sm:w-1/2' alt="" />
//     </div>
//   )
// }

// export default Hero







import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import banner3 from "../assets/banner1.webp"
import woman1 from "../assets/women1.png"
import kid2 from "../assets/kid2.jpeg"
import man7 from "../assets/man7.jpeg"
import { ShopContext } from '../context/ShopContext'






// import kid1 from "../assets/"

const Hero = () => {
  const {navigate,setCategory,category}=useContext(ShopContext)
  //category=[]
  const womanCollection=()=>{
    
    setCategory(['Women'])
    navigate('/collection')
  }
  const manCollection = () => {
    setCategory(['Men'])
    navigate('/collection')
  }
  
  const kidCollection = () => {
    setCategory(['Kids'])
    navigate('/collection')
  }
  return (
    <div className=''>
        {/* hero left side */}
          <div className='relative'>
            <span className='text-4xl sm:text-7xl md:text-8xl lg:text-9xl text-white tracking-widest font-extralight absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center w-full'>Latest Arrivals</span>
            <button onClick={()=>navigate('/collection')} className=' absolute top-[calc(50%+3rem)] sm:top-[calc(50%+4rem)] md:top-[calc(50%+6rem)] lg:top-[calc(50%+8rem)] left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center  font-light px-4 py-1 text-sm sm:text-medium md:text-base sm:px-6 sm:py-2 bg-white opacity-80 hover:opacity-50 text-black'>SHOP NOW</button>
          <img src={banner3} alt="" className='object-cover' />
          </div>
          {/* for woman */}
        <h1 className='text-center text-2xl font-light tracking-widest my-10 mt-12 text-gray-950'>EXCLUSIVE COLLECTIONS</h1>
        <div className='border border-gray-200  flex flex-col sm:flex-row justify-center items-center md:gap-6 lg:gap-12 pb-6 sm:pb-0'>
          <img src={woman1} alt="" className='lg:w-2/5 sm:w-1/2 w-full lg:ml-20 sm:h-[400px] lg:h-[600px] object-cover' />
          <div className='flex flex-col gap-10 items-center'>
            <p className='mt-6 text-4xl md:text-5xl lg:text-7xl font-light  text-gray-900 text-center '>WOMEN'S COLLECTION</p>

            <button onClick={womanCollection} className='py-2  text-white bg-gray-950 w-1/2 sm:w-2/5 md:w-1/3 font-light hover:opacity-80'>SHOP NOW</button>
          </div>
          
        </div>

        {/* for man */}

        <div className='border border-gray-200 mt-12 flex flex-col sm:flex-row justify-center items-center pb-6 sm:pb-0 gap-12 md:gap-3 lg:gap-36 '>
  {/* Image will appear first on mobile, but move to the right on sm and larger screens */}
  <div className='order-first sm:order-last lg:w-2/5 sm:w-1/2 mr-0 lg:mr-12 '>
    <img src={man7} alt="" className=' w-full sm:h-[400px] lg:h-[600px] object-cover' />
  </div>
  
  <div className='flex flex-col gap-10 items-center '>
    <p className='text-4xl md:text-5xl lg:text-7xl font-light  text-gray-900 text-center'>MEN'S <br/> COLLECTION</p>
    <button onClick={manCollection} className='py-2  text-white bg-gray-950 w-1/2 sm:w-2/5 md:w-3/6 font-light hover:opacity-80'>SHOP NOW</button>
  </div>
</div>

        {/* for kids */}
        <div className='border border-gray-200 mt-12  flex flex-col sm:flex-row justify-center items-center md:gap-6 lg:gap-12 pb-6 sm:pb-0'>
          <img src={kid2} alt="" className='lg:w-2/5 sm:w-1/2 w-full sm:mr-16 sm:h-[400px] lg:h-[600px] object-cover' />
          <div className='flex flex-col gap-10 items-center'>
            <p className='mt-6 text-4xl md:text-5xl lg:text-7xl font-light  text-gray-900 text-center'>KID'S <br/> COLLECTION</p>

            <button onClick={kidCollection} className='py-2  text-white bg-gray-950 w-1/2  md:w-3/10 font-light hover:opacity-80'>SHOP NOW</button>
          </div>
          
        </div>
     
        
    </div>
  )
}

export default Hero


