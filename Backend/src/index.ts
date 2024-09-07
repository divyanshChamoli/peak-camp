import { Express, Request, Response } from "express"
import { Jwt,JsonWebTokenError,JwtHeader,JwtPayload } from "jsonwebtoken"
import * as jwt from "jsonwebtoken"
import { UserAuthenticationMiddleware } from "./Middlewares/UserAuthenticationMiddleware"
import { connectToDB, User, Camp} from "./Database"
const express= require("express")
const app: Express=express()
export const JWT_SECRET="divyansh_server"

app.use(express.json())
connectToDB()

export enum HttpStatusCode{
    OK = 200,
    CREATED = 201,
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    NOT_FOUND = 404,
    TOO_MANY_REQUESTS = 429,
}

app.get('/camps',UserAuthenticationMiddleware, async (req:Request, res:Response)=>{
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

app.post('/camp',UserAuthenticationMiddleware, async (req:Request, res:Response)=>{
    try{
        const campData:Camp =req.body 
        await Camp.create(req.body as Camp)
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
    
    // const user: User={
    //     username: username,
    //     password: password
    // }
    // eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImRpdnlhbnNoIiwiaWF0IjoxNzI1NjgyODkwfQ.hJx6aoIVTpGYjFtgHeqV6Grage6AOJThOgSyASI1cBk
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
        const foundUser=await User.findOne({username,password})
        if(!foundUser){
            throw new Error("User not found")
        }

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


