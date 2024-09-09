const express= require("express")
import { Express } from "express"

const campRouter=require("./Routes/camp")
const userRouter=require("./Routes/user")
const reviewRouter=require("./Routes/review")

const app: Express=express()
app.use(express.json())
app.use("/",campRouter)
app.use("/",userRouter)
app.use("/",reviewRouter)


app.listen(3000,()=>{
    console.log("listening")
})


