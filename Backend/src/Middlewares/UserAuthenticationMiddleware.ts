import { Request, Response, NextFunction } from "express"
import { HttpStatusCode } from "..";
import jwt from "jsonwebtoken"
import { JWT_SECRET } from "..";
import { authorizationHeaderSchema } from "../zod";

export const UserAuthenticationMiddleware = (req: Request, res: Response, next: NextFunction) :void=>{
    const authorization=req.headers.authorization;
    const result=authorizationHeaderSchema.safeParse(authorization)
    if(!result.success || !authorization){
        res.status(HttpStatusCode.UNAUTHORIZED).json({
            message: "User not logged in"
        })
        return;
    }
    const token=authorization.split(' ')[1];
    try{
        jwt.verify(token,JWT_SECRET)
        next()
    }
    catch(err){
        res.status(HttpStatusCode.UNAUTHORIZED).json({
            message: "User not logged in"
        })
        return;
    }  
}