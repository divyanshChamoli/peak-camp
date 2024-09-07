import { Express, request, Request, Response } from "express"
import { Schema, model, connect } from "mongoose"
import { Jwt,JsonWebTokenError,JwtHeader,JwtPayload } from "jsonwebtoken"
import * as jwt from "jsonwebtoken"

const express= require("express")
const app: Express=express()
const mongoose = import("mongoose")
export const JWT_SECRET="divyansh_server"

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

const CampSchema=new Schema<Camp>({
    campName:String,
    campDescription:String,
    campLocation:String,
    campPrice: String
})

const Camp =model<Camp>("Camp",CampSchema)

export enum HttpStatusCode{
    OK = 200,
    CREATED = 201,
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
})

app.post("/signup",async (req: Request, res: Response)=>{
    const username=req.body?.username
    const password=req.body?.password
    if(!username || !password){
        res.status(HttpStatusCode.BAD_REQUEST).json({
            message:"Incorrect/No username and password"
        })
        return;
    }
    
    const user: User={
        username: username,
        password: password
    }
    // eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzZXJuYW1lIiwiaWF0IjoxNzI1NjM0NzUwfQ.YG1v_bFC3PgZXXUML_8vsYLbozAQ5n6FPrIak-ABvBY
    const JWTtoken=jwt.sign({username},JWT_SECRET)
    try{
        await User.create({username,password});
        res.json({
            message: "User successfully registered",
            JWTtoken: JWTtoken
        })
    }
    catch(err){
        console.log(err)
        res.json({
            message:"Error"
        })
    }
})

app.post("/signin",async (req:Request, res:Response )=>{
    const username=req.body?.username    
    const password=req.body?.password
    
    try{
        await User.findOne({username,password})
        const JWTtoken=jwt.sign({username},JWT_SECRET)
        res.json({
            message: "Signin successfull",
            JWTtoken: JWTtoken
        })
    }

    catch(err){
        console.log(err)
        res.status(HttpStatusCode.NOT_FOUND).json({
            message: "User not found"
        })
    }
})

app.listen(3000,()=>{
    console.log("listening")
})


