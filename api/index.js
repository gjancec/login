import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors'
import userRoutes from './routes/user.route.js'





//connect to express app
const app=express();

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

//middleware
app.use(cors())

// Routes
app.listen(3001, () =>{
    console.log('Server listening on port 3001');
})



//Route for User  
app.use("/api/user", userRoutes);



