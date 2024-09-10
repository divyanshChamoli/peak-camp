import { Router, Request, Response } from "express";
import { LoginCredentialValidationMiddleware } from "../Middlewares/LoginCredentialValidationMiddleware";
import jwt from "jsonwebtoken"
import { User } from "../Database";
import { HttpStatusCode, JWT_SECRET } from "../utils";
import { UserAuthenticationMiddleware } from "../Middlewares/UserAuthenticationMiddleware";

const router=Router()
// 1) User
// create a user/ signup 
// login a User/ signin
// get all users "/users"
// delete a user "/:userId"
// update maybe


//signup user
router.post("/signup",LoginCredentialValidationMiddleware ,async (req: Request, res: Response)=>{
    const {username, password}= req.body
    
    try{
        await User.create({username,password});
        res.json({
            message: "User successfully registered",
        })
    }
    catch(err){
        console.log(err)
        res.json({
            message:"User not registered"
        })
    }
})

//signin user
router.post("/signin",LoginCredentialValidationMiddleware,async (req:Request, res:Response )=>{
    const {username, password}=req.body
    try{
        const foundUser=await User.findOne({username,password})
        if(!foundUser){
            throw new Error("User not found")
        }
        const userId=foundUser._id.toString()
        const JWTtoken=jwt.sign({userId},JWT_SECRET)
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

router.get("/users",async (req: Request, res: Response)=>{
    try{
        const users: User[]=await User.find({});
        res.json({
            users:users
        })
    }
    catch(err){
        console.log(err)
        res.json({
            message:"Error"
        })
    }
})

//Should I delete all the camps and reviews too?
//can check if the user being deleted is the same one logged in/ instead of getting userId from url. use res.locals userId 
router.delete("/:userId",UserAuthenticationMiddleware,async (req: Request, res:Response)=>{
    const userId=req.params.userId;
    try{
        const deletedUser=await User.findByIdAndDelete(userId)
        if(!deletedUser){
            //if id is correct but user doesnt exist in db
            throw new Error("Cannot find user")
        }
        res.json({
            message: "User deleted successfully"
        })
    }
    catch(err){
        console.log(err)
        res.json({
            message: "Error"
        })
    }  
})

//update endpoint: maybe 

module.exports = router