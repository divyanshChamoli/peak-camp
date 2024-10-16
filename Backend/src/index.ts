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

app.use(cors(
    {
        origin: ["https://peakcamp.vercel.app", "http://localhost:5173/"],
        credentials: true
    }
))
app.use(express.json())
app.use("/camp",campRouter)
app.use("/user",userRouter)
app.use("/review",reviewRouter)


app.listen(port,()=>{
    console.log("listening")
})


