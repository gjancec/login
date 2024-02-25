import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="flex flex-col h-screen  items-center w-full px-2 font-rubik text-[#303039] bg-[#6b728e] font-[600]">
    <div className="hero">

      <div className="max-w-[1200px]  grid sm:grid-cols-2  h-screen w-full md:pt-[100px] pt-[200px] px-2 text-xl">
        <div className="pt-[150px] flex flex-col z-10 ">
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
            <h1 className="text-4xl uppercase font-bold tracking-wider pb-1">
              Welcome to my <span className="text-[#EDB74D]">Auth App!</span>
            </h1>
            <p className="pb-4 z-10 ">
              Full-stack web application built with the MERN stack.
            </p>
            <Link
              className="group text-[16px] lg:text-[20px] transition-all duration-300 ease-in-out "
              to="/about"
            >
              <span className=" text-[#303039] pb-1 bg-left-bottom bg-gradient-to-r from-[#EDB74D] to-[#EDB74D] bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out">
                &#8594; about application
              </span>
            </Link>
          </motion.div>
        </div>
        <div className="hidden lg:block h-[500px] w-[500px]  flex-col relative justify-center">
          <div className="yellow blob"></div>
          <div className="red blob"></div>
          <div className="green blob"></div>
        </div>
      </div>
      </div>
    </div>
  );
};

export default Home;