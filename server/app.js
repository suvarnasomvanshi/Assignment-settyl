// axios
// password hashing
// jwt token 
// session storage cookies-parser
// typeScript

// both server/client side Authentication



import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = process.env.PORT

mongoose.connect(process.env.MONGODB_URL)
.then(()=>{console.log('connected to database')})
.catch((err)=> console.log(err))


app.listen({port},()=>{
    console.log(`connected to port ${port}`)})




