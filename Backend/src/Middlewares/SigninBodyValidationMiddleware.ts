import { NextFunction,Request,Response} from "express";
import { SigninBodySchema } from "../zod";
import { HttpStatusCode } from "../utils";

export const SigninBodyValidationMiddleware=(req:Request, res:Response, next: NextFunction)=>{
    const signinBody=req.body;
    const result=SigninBodySchema.safeParse(signinBody)
    if(!result.success){
        res.status(HttpStatusCode.BAD_REQUEST).json({
            Error :"Invalid inputs"
        })
        return;
    }
    next()
}