import { Express, Request, Response } from "express"
import { Schema, model, connect } from "mongoose"

const mongoose = import("mongoose")
const express= require("express")
const app: Express=express()
app.use(express.json())

const connectToDB=async ()=>{
    try{
        (await mongoose).connect("mongodb+srv://divyanshchamoli:wxvn7144@cluster0.qrzriqj.mongodb.net/camping-webapp")
        console.log("DB connected")
    }
    catch(err){
        console.log("DB not connected",err)
    }
}

connectToDB()

interface Camp{
    campName: string,
    campDescription: string,
    campLocation: string,
    campPrice: number,
    //image
}

const campSchema=new Schema<Camp>({
    campName:String,
    campDescription:String,
    campLocation:String,
    campPrice: String
})

const Camp =model<Camp>("Camp",campSchema)

enum HttpStatusCode{
    OK = 200,
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    NOT_FOUND = 404,
    TOO_MANY_REQUESTS = 429,
}

interface User{
    username: string,
    password: string,
}

const UserSchema= new Schema<User>({
    username: String,
    password: String
})

const User= model<User>("User",UserSchema)



app.get('/camps',async (req:Request, res:Response)=>{
    try{
        let camps:Camp[]=await Camp.find({})
        res.json({
            camps:camps
        })
    }
    catch(err){
        console.log(err)
        res.json({
            message:"Error"
        })
    }
})

app.post('/camp', async (req:Request, res:Response)=>{
    try{
        await Camp.create(req.body)
        res.json({
            message: "Successfully created Camp"
        })
    }
    catch(err){
        console.log(err)
        res.json({
            message:"Error"
        })
    }
    
    res.json({
        camps:"camps"
    })
})

app.listen(3000,()=>{
    console.log("listening")
})


