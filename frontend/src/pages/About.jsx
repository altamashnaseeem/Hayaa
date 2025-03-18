import React from 'react'
import Title from "../components/Title"
import {assets} from "../assets/assets"
import NewsLetter from "../components/NewsLetter"
const About = () => {
  return (
    <div>
      <div className='text-2xl text-center pt-8 border-t'>
        <Title text1={'ABOUT'} text2={'US'}/>

      </div>
      <div className='my-10 flex flex-col md:flex-row gap-16'>
        <img className='w-full  md:max-w-[450px]' src={assets.about_img} alt="" />
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
        <p>Welcome to Hayaa, where elegance meets contemporary fashion. Founded with a passion for curating premium clothing collections, we have established ourselves as a destination for those who appreciate quality craftsmanship and timeless style.</p>
        <p>Our journey began with a simple vision: to provide exceptional fashion pieces that empower individuals to express their unique identity. Every item in our collection is carefully selected to ensure superior quality, comfort, and style that transcends seasonal trends.</p>
        <b className='text-gray-800'>Our Mission</b>
        <p>At Hayaa, our mission is to transform the way people experience fashion by offering carefully curated collections that blend timeless elegance with contemporary designs. We are committed to sustainability, ethical sourcing, and creating an inclusive shopping environment where everyone can discover pieces that make them feel confident and inspired.</p>
        </div>
      </div>
      <div className='text-xl py-4'>
        <Title text1={'WHY'} text2={'CHOOSE US'}/>
      </div>
      <div className='flex flex-col md:flex-row text-sm mb-20'>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Quality Assurance:</b>
          <p className='text-gray-600'>We meticulously select each item in our collection, ensuring that it meets our rigorous standards for quality and craftsmanship. From fabric selection to final stitching, every detail is examined to guarantee that you receive products that are built to last and designed to impress. </p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Convenience:</b>
          <p className='text-gray-600'>Our intuitive website, flexible shipping options, and hassle-free return policy are designed with your convenience in mind. We understand the value of your time and have streamlined the shopping experience so you can focus on finding pieces you love without any complications.</p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Exceptional Customer Service:</b>
          <p className='text-gray-600'>Our dedicated team is always ready to assist you with personalized recommendations, sizing guidance, and prompt resolution of any concerns. We believe that exceptional service is the foundation of a memorable shopping experience, and we're committed to exceeding your expectations at every interaction.</p>
        </div>
      </div>
      <NewsLetter/>
    </div>
  )
}

export default About