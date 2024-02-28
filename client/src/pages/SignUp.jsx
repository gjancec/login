import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import OAuth from "../components/OAuth";
import {motion} from 'framer-motion'


const SignUp = () => {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  
  //event listener for form
  const handleChange = (e) => {
    //...formData  keep the previous value 
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  //console.log(formData);

  const handleSubmit = async (e) => {
    //preventing refreshing the page
    e.preventDefault();
    try {
      setLoading(true);
      setError(false);
      const res = await fetch('https://login-server-virid.vercel.app/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
      setLoading(false);
      if (data.success === false) {
        setError(true);
        return;
      }
      
      navigate('/sign-in');

    } catch (error) {
      setLoading(false);
      setError(true);
    }
  };
  return (
    <div className="flex flex-col h-screen font-rubik items-center w-full px-2 text-[#303039] bg-[#6b728e] ">
      <div className="hero">
      <div className="max-w-[1200px]  grid sm:grid-cols-2  h-screen w-full pt-[100px] text-xl">
        <div className="pt-[120px] flex flex-col max-w-[450px] z-10 ">
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
        <h1 className="pb-4 font-bold text-[#6FB18A]">CREATE  <span className="font-[500] text-lg text-[#303039]">your account</span> </h1>
          

          <form onSubmit={handleSubmit} className="flex flex-col text-lg ">
            <input
              id="username"
              type="text"
              placeholder="Username"
              className="bg-transparent p-2 rounded-[5px] border-[2px] border-[#303039] mb-3"
              onChange={handleChange}
            />
            <input
              id="email"
              type="email"
              placeholder="Email"
              className="bg-transparent p-2 rounded-[5px] border-[2px] border-[#303039] mb-3"
              onChange={handleChange}
            />
            <input
              id="password"
              type="password"
              placeholder="Password"
              className="bg-transparent p-2 rounded-[5px] border-[2px] border-[#303039] mb-3"
              onChange={handleChange}
            />
        <button
          disabled={loading}
          className='bg-[#303039] text-[#6FB18A] font-medium p-1 rounded-lg uppercase hover:opacity-95 disabled:opacity-80 mb-2'
        >
          {loading ? 'Loading...' : 'Sign Up'}
        </button>

        <OAuth />
          </form>

          <div>
            <p className="pt-3 text-lg">
              Have an account?
              <Link to="/sign-in">
                <span className="text-[#6FB18A] text-lg"> Log in now</span>
              </Link>
            </p>
            <p className='text-red-700 mt-5'>{error && 'Something went wrong!'}</p>
          </div>
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

export default SignUp;
