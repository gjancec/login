import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../redux/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import OAuth from "../components/OAuth";
import {motion} from 'framer-motion'

const SignIn = () => {
  const [formData, setFormData] = useState({});
  const { loading, error } = useSelector((state) => state.user);
  //const [error, setError] = useState(false);
  //const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      // setLoading(true);
      //setError(false);
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      //setLoading(false);
      if (data.success === false) {
        dispatch(signInFailure(data));
        //setError(true);
        return;
      }
      dispatch(signInSuccess(data));
      //if signin ok navigate to home page or where you wont
      navigate("/");
    } catch (error) {
      dispatch(signInFailure(error));
      //setLoading(false);
      //setError(true);
    }
  };
  return (
    <div className="flex flex-col h-screen  items-center w-full px-2 font-rubik text-[#f2f8f7] bg-[#6b728e] ">
      <div className="hero">
      <div className="max-w-[1200px]  grid sm:grid-cols-2  h-screen w-full pt-[100px] text-xl">
        <div className="pt-[150px] flex flex-col max-w-[465px] z-10 ">
       
          
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
          <h1 className="pb-4 font-bold text-[#6FB18A]">SIGN IN <span className="font-[500] text-lg text-[#303039]">to your account</span> </h1>
        

          <form onSubmit={handleSubmit} className="flex flex-col  text-lg ">
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
              className="bg-[#303039] text-[#6FB18A]  font-medium p-1 rounded-lg uppercase hover:opacity-80 disabled:opacity-80 mb-2"
            >
              {loading ? "Loading..." : "Sign In"}
            </button>
            <OAuth />
          </form>

          <div>
            <p className="pt-3 text-lg text-[#303039]">
              Don&#39;t have an account?
              <Link to="/sign-up">
                <span className="text-[#6FB18A]"> Sign Up</span>
              </Link>
            </p>
            <p className="text-red-700 mt-5">
              {error ? error.message || "Something went wrong!" : ""}
            </p>
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

export default SignIn;
