import { NextFunction,Request,Response} from "express";
import { SignupBodySchema } from "../zod";
import { HttpStatusCode } from "../utils";

export const SignupBodyValidationMiddleware=(req:Request, res:Response, next: NextFunction)=>{
    const signupBody=req.body;
    const result=SignupBodySchema.safeParse(signupBody)
    if(!result.success){
        res.status(HttpStatusCode.BAD_REQUEST).json({
            Error :"Invalid inputs"
        })
        return;
    }
    next()
}