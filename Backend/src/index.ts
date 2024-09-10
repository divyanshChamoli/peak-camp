const express= require("express")
import { Express } from "express"

const campRouter=require("./Routes/camp")
const userRouter=require("./Routes/user")
const reviewRouter=require("./Routes/review")

const app: Express=express()
app.use(express.json())
app.use("/camp",campRouter)
app.use("/user",userRouter)
app.use("/review",reviewRouter)


app.listen(3000,()=>{
    console.log("listening")
})


