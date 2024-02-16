import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

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



// Routes
app.listen(3001, () =>{
    console.log('Server listening on port 3001');
})