import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {  FaBars, FaTimes, } from 'react-icons/fa';
import { useSelector } from 'react-redux';

const Navbar = () => {

  const [nav, setNav] = useState(false);
  const handleClick = () => setNav(!nav);
  const { currentUser } = useSelector((state) => state.user);
  
  return (

    <div>
      <div className="fixed w-full h-[80px] flex justify-between items-center md:px-[60px] px-3 
      font-rubik text-[#303039] font-semibold z-10">
        <Link to="/">
        <h1>MERN Auth</h1>
        </Link>
        <ul className="hidden md:flex gap-5">
        <Link to="/">
          <li>Home</li>
          </Link>
          <Link to="/about">
          <li>About</li>
          </Link>
          <Link to='/profile'>
            {currentUser ? (
              <img src={currentUser.profilePicture} alt='profile' className='h-7 w-7 rounded-full object-cover' />
            ) : (
              <li>SIGN IN</li>
            )}
          
          </Link>
        </ul>

          {/* Hamburger */}
      <div onClick={handleClick} className='md:hidden z-10'>
        {!nav ? <FaBars /> : <FaTimes />}
      </div>

      {/* Mobile menu */}
      <ul
        className={
          !nav
            ? 'hidden'
            : 'absolute top-0 left-0 w-full h-screen bg-[#6b728e] text-[#303039] flex flex-col justify-center items-center'
        }
      >
        <li className='py-6 text-4xl'>
          <Link onClick={handleClick} to='/'>
            Home
          </Link>
        </li>
        <li className='py-6 text-4xl'>
        
          <Link onClick={handleClick} to='/about' >
            About
          </Link>
        </li>
        {/*<li className='py-6 text-4xl'>
         
          <Link onClick={handleClick} to='/sign-in' >
            LOGIN  
          </Link>
      </li>*/}

        <Link onClick={handleClick} to='/profile'>
            {currentUser ? (
              <img src={currentUser.profilePicture} alt='profile' className='h-7 w-7 rounded-full object-cover' />
            ) : (
              <li className='py-6 text-4xl'>SIGN IN</li>
            )}
        </Link>
      </ul>
      </div>
    </div>
  );
};

export default Navbar;
