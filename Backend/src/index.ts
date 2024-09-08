import { Express, Request, Response } from "express"
import jwt from "jsonwebtoken"
import { UserAuthenticationMiddleware } from "./Middlewares/UserAuthenticationMiddleware"
import { connectToDB, User, Camp} from "./Database"
import { CampBodyValidationMiddleware } from "./Middlewares/CampBodyValidationMiddleware"
import { LoginCredentialValidationMiddleware } from "./Middlewares/LoginCredentialValidationMiddleware"
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

app.get('/camps', async (req:Request, res:Response)=>{
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

app.post('/camp/:user',UserAuthenticationMiddleware, CampBodyValidationMiddleware, async (req:Request, res:Response)=>{
    //user ObjectId from url
    const user=req.params.user
    try{
        //body has the first 4 + user + reviewsOnCamp will be empty when the camp is created
        await Camp.create({...req.body, user, reviewsOnCamp: []})
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

app.post("/signup",LoginCredentialValidationMiddleware ,async (req: Request, res: Response)=>{
    const username=req.body.username
    const password=req.body.password

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

app.post("/signin",LoginCredentialValidationMiddleware,async (req:Request, res:Response )=>{
    const username=req.body.username    
    const password=req.body.password
  
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


