import express from "express";
import mongoose from "mongoose";
import { v2 as cloudinary } from 'cloudinary';
import fileUpload from "express-fileupload";
import cookieParser from "cookie-parser";

import Courseroute from './Routes/Course.rout.js';
import Userroute from './Routes/User.rout.js';
import orderRoute from "./Routes/order.rout.js";
import Admineroute from "./Routes/Admine.rout.js"

import dotenv from "dotenv"; 
import  cors from 'cors';
// Asign the All Resource in App
const app = express();
const port = process.env.PORT;

// ENV configuration
 dotenv.config();


// MIDELWARE
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
// File upload service
app.use(fileUpload({
  useTempFiles : true,
  tempFileDir : '/tmp/'
}));


 // Cors middleware
 app.use(cors({
  origin: process.env.FRONTEND ,
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: [ "Content-Type", "Authorization"]
}))



app.get('/', (req, res) => {
  res.send('Welcome to Course app')
})
// MONGO DB CONNECTIONS
try {
 await mongoose.connect(process.env.MONGO_URI);
  console.log("Connected to mongodb database successfully")
} catch (error) {
  console.log("Error connecting to mongodb database", error)
}
// All Main Routes Defined & its Main Points
app.use("/api/v1/course", Courseroute)
app.use("/api/v1/user", Userroute)
app.use("/api/v1/admine", Admineroute)
app.use("/api/v1/order", orderRoute);
// Cloudinary Configuration Code
    cloudinary.config({ 
      cloud_name: "dc0eskzxx" ,
      api_key: "645985342632788" ,  
      api_secret: "iu7MJQ6i5XHaX-yjn5-YodGakdg", 
  });
  // App Listen ON given Port
app.listen(port, function (req, res) {
  console.log("server listening on port http://localhost:" + port);
});
