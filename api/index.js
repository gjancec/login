import express from 'express';

//connect to express app
const app=express();




// Routes
app.listen(3001, () =>{
    console.log('Server listening on port 3001');
})