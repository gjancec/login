import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors'
import userRoutes from './routes/user.route.js'
import authRoutes from './routes/auth.route.js'
import cookieParser from 'cookie-parser';




//connect to express app
const app=express();
//middleware
app.use(cors(
  {
    origin: true,
   credentials:true
  }
));
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
})


// for testing post json from browser to api
app.use(express.json());

app.use(cookieParser());



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


const port=process.env.PORT;
// Routes
app.listen(port, () =>{
    console.log(`Server listening on ${port}`);
})

app.use("/", userRoutes)

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





