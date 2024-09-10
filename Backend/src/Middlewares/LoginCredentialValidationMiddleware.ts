import { NextFunction,Request,Response} from "express";
import { LoginCredentialSchema } from "../zod";
import { HttpStatusCode } from "../utils";

export const LoginCredentialValidationMiddleware=(req:Request, res:Response, next: NextFunction)=>{
    const loginCredentials=req.body;
    const result=LoginCredentialSchema.safeParse(loginCredentials)
    if(!result.success){
        res.status(HttpStatusCode.BAD_REQUEST).json({
            message:"Invalid inputs"
        })
        return;
    }
    next()
}