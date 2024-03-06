import { useSelector } from 'react-redux';
import { useRef, useState, useEffect } from 'react';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { app } from '../firebase';
import { useDispatch } from 'react-redux';
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
  signOut,
} from '../redux/user/userSlice';
import {motion} from 'framer-motion'


const Profile = () => {
  const dispatch = useDispatch();
  const fileRef = useRef(null);
  const [image, setImage] = useState(undefined);
  const [imagePercent, setImagePercent] = useState(0);
  const [imageError, setImageError] = useState(false);
  const [formData, setFormData] = useState({});
  const[updateSuccess, setUpdateSuccess]=useState(false);

  const { currentUser, loading, error } = useSelector((state) => state.user);
  useEffect(() => {
    if (image) {
      handleFileUpload(image);
    }
  }, [image]);
  
  const handleFileUpload = async (image) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + image.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, image);
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImagePercent(Math.round(progress));
      },
      (error) => {
        setImageError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({ ...formData, profilePicture: downloadURL })
        );
      }
    );
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  
  //MongoDb
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(updateUserFailure(data));
        return;
      }
      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateUserFailure(error));
    }
  };

  const handleDeleteAccount = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(error));
    }
  };

  const handleSignOut = async () => {
    try {
      await fetch('https://login-server-virid.vercel.app/api/auth/signout');
      dispatch(signOut())
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex flex-col h-screen  items-center w-full px-2 font-rubik bg-[#6b728e] ">
      <div className="hero">
      <div className="max-w-[1200px]  grid sm:grid-cols-2  h-screen w-full pt-[100px] text-lg">
        <div className="pt-[90px] flex flex-col max-w-[465px] z-10 ">
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
          <h1 className="text-center font-medium text-[#6FB18A]">Profile</h1>

          <form onSubmit={handleSubmit} className="flex flex-col   ">
          <input
          type='file'
          ref={fileRef}
          hidden
          accept='image/*'
          onChange={(e) => setImage(e.target.files[0])}
        />
        {/* 
      firebase storage rules:  
      allow read;
      allow write: if
      request.resource.size < 2 * 1024 * 1024 &&
      request.resource.contentType.matches('image/.*') */}
            <img
              src={formData.profilePicture || currentUser.profilePicture}
              alt="profile"
              className="h-24 w-24 self-center cursor-pointer rounded-full object-cover mt-3 mb-3"
              onClick={() => fileRef.current.click()}
            />
           <p className='text-sm self-center'>
          {imageError ? (
            <span className='text-red-700'>
            Error uploading image (file size must be less than 2 MB)
          </span>
          ) : imagePercent > 0 && imagePercent < 100 ? (
            <span className='text-slate-700'>{`Uploading: ${imagePercent} %`}</span>
          ) : imagePercent === 100 ? (
            <span className='text-green-700'>Image uploaded successfully</span>
          ) : (
            ''
          )}
        </p>
            <input
              defaultValue={currentUser.username}
              id="username"
              type="text"
              placeholder="Username"
              className="bg-transparent p-2 rounded-[5px] border-[2px] border-[#303039] mb-3"
              onChange={handleChange}
            />
            <input
              defaultValue={currentUser.email}
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
              className=" bg-transparent p-2 rounded-[5px] border-[2px] border-[#303039] mb-3"
              onChange={handleChange}
            />
            <button className='bg-[#303039] text-[#6FB18A]  font-medium p-1 rounded-lg uppercase hover:opacity-80 disabled:opacity-50 '>
            {loading ? 'Loading...' : 'Update'}
        </button>
          </form>

          <div className='flex justify-between pt-1'>
            <span onClick={handleDeleteAccount} className="text-[#6FB18A] cursor-pointer ">Delete Account</span>
            <span onClick={handleSignOut} className="text-[#6FB18A] cursor-pointer ">Sign out</span>
          </div>
          <p className='text-red-700 mt-5'>
            {error && 'Something went wrong!'}
            </p>
      <p className='text-green-700 mt-5'>
        {updateSuccess && 'User is updated successfully!'}
      </p>
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

export default Profile;
