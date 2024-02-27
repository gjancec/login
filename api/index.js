import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors'
import userRoutes from './routes/user.route.js'
import authRoutes from './routes/auth.route.js'
import cookieParser from 'cookie-parser';




//connect to express app
const app=express();

// for testing post json from browser to api
app.use(express.json());

app.use(cookieParser());

//middleware
app.use(cors());

//connect to MongoDB
dotenv.config();

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.log(err);
  });



// Routes
app.listen(3001, () =>{
    console.log('Server listening on port 3001');
})



//Route for User  
app.use("/api/user", userRoutes);

//Route for signup auth

app.use("/api/auth", authRoutes);




app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  return res.status(statusCode).json({
    success: false,
    message,
    statusCode,
  });
});





