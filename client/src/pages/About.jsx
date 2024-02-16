import React from 'react'
import {motion} from 'framer-motion'

const About = () => {
  return (
    <div className='flex flex-col h-screen  items-center w-full px-2 font-[500] font-rubik text-[#303039] bg-[#6b728e] '>
  <div className="hero">
    <div className='max-w-[1200px]  grid sm:grid-cols-2  h-screen w-full pt-[100px] text-xl'>
     <div className='pt-[100px] px-2 flex flex-col max-w-[465px] z-10'>
       
     <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            transition={{ delay: 0, duration: 0.8 }}
            variants={{
              hidden: { opacity: 0, y: -50 },
              visible: { opacity: 1, y: 0 },
            }}
          >
       <h1 className='font-bold text-[#9d174d] tracking-wider text-2xl'>ABOUT</h1>
      
       <p className='py-2 text-justify'>This is a MERN (MongoDB, Express, React, Node.js) stack application with
        authentication. It allows users to sign up, log in, and log out, and
        provides access to protected routes only for authenticated users.</p>
        <p className='text-justify'> The front-end of the application is built with React and uses React
        Router for client-side routing. The back-end is built with Node.js and
        Express, and uses MongoDB as the database. Authentication is implemented
        using JSON Web Tokens (JWT).</p>
       
       </motion.div>
     </div>
     <div className="hidden lg:block h-[500px] w-[500px]  flex-col relative justify-center">
       <div class="yellow blob"></div>
       <div class="red blob"></div>
       <div class="green blob"></div>
     </div>
   </div>
   </div>
   </div>
  
   
  )
}

export default About