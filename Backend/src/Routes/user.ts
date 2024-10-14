import { Router, Request, Response } from "express";
import { User } from "../db";
import { HttpStatusCode } from "../utils";
import { UserAuthenticationMiddleware } from "../Middlewares/UserAuthenticationMiddleware";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import { SignupBodyValidationMiddleware } from "../Middlewares/SignupBodyValidationMiddleware";
import { SigninBodyValidationMiddleware } from "../Middlewares/SigninBodyValidationMiddleware";
const router=Router()
// 1) User
// create a user/ signup 
// login a User/ signin
// get all users "/users"
// delete a user "/:userId"
// update maybe


//signup user
router.post("/signup",SignupBodyValidationMiddleware ,async (req: Request, res: Response)=>{
    const {username, password , firstName, lastName }= req.body
    try{
        const saltRounds=10
        const hashedPassword=await bcrypt.hash(password,saltRounds);
        const user=await User.create({username,password: hashedPassword, firstName, lastName});
        if(!user){
            throw new Error("User was not registered")
        }
        res.json({
            message: "User successfully registered",
        })  
    }
    catch(e){
        console.log(e)
        res.json({
            Error : "User can't be registered"
        })
    }
})

//signin user
router.post("/signin",SigninBodyValidationMiddleware,async (req:Request, res:Response )=>{
    const {username, password}=req.body
    const JWT_SECRET = process.env.JWT_SECRET as string
    try{
        const foundUser=await User.findOne({username})
        if(!foundUser){
            throw new Error("User not found")
        }
        const hashedPassword=foundUser.password;
        const match=await bcrypt.compare(password,hashedPassword)
        if(!match){
            throw new Error("User password is incorrect")
        }
        const userId=foundUser._id.toString()
        const JWTtoken=jwt.sign({userId}, JWT_SECRET)
        res.json({
            message: "Signin successfull",
            token: JWTtoken
        })
    }

    catch(err){
        console.log(err)
        res.status(HttpStatusCode.NOT_FOUND).json({
            Error: "User not found"
        })
    }
})

router.get("/authenticate",UserAuthenticationMiddleware ,async (req: Request, res: Response)=>{
    res.json({
        message: "Authenticated"
    })
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

router.get("/:userId",async (req: Request, res: Response)=>{
    const userId=req.params.userId
    try{
        const user=await User.findById(userId);
        if(!user){
            throw new Error("User doesnt exist!")
        }
        res.json({
            user: user 
        })
    }
    catch(err){
        console.log(err)
        res.json({
            Error: err
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