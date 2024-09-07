import { Request, Response, NextFunction } from "express"
import { HttpStatusCode } from "..";
import * as jwt from "jsonwebtoken"
import { JWT_SECRET } from "..";

export const UserAuthenticationMiddleware = (req: Request, res: Response, next: NextFunction) :void=>{
    const authorization=req.headers.authorization;
    if(!authorization){
        res.status(HttpStatusCode.UNAUTHORIZED).json({
            message: "User not logged in"
        })
        return;
    }

    const token: string=authorization?.split(' ')[1];
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