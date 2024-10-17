import { Express } from "express"
// import 'dotenv/config'
require('dotenv').config()
const express= require("express")
const cors=require("cors")
const campRouter=require("./Routes/camp")
const userRouter=require("./Routes/user")
const reviewRouter=require("./Routes/review")

const app: Express=express()
const port=process.env.PORT || 3000

// app.use(cors(
//     {
//         origin: ["https://peakcamp.vercel.app", "http://localhost:5173/"],
//         credentials: true
//     }
// ))
// app.use(function(req, res, next) {
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
//     res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
//     // res.setHeader('Access-Control-Allow-Credentials', 1);
//     next();
// });
app.use(cors())
app.use(express.json())
app.use("/camp",campRouter)
app.use("/user",userRouter)
app.use("/review",reviewRouter)

app.get('/',(req, res)=>{
    res.send("Backend is up!")
})

app.listen(port,()=>{
    console.log("listening on", port)
})


