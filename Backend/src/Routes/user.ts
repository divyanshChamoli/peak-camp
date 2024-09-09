import { Router, Request, Response } from "express";
import { LoginCredentialValidationMiddleware } from "../Middlewares/LoginCredentialValidationMiddleware";
import jwt from "jsonwebtoken"
import { User } from "../Database";
import { HttpStatusCode, JWT_SECRET } from "../utils";

const router=Router()

//signup user
router.post("/signup",LoginCredentialValidationMiddleware ,async (req: Request, res: Response)=>{
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

//signin user
router.post("/signin",LoginCredentialValidationMiddleware,async (req:Request, res:Response )=>{
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

module.exports = router