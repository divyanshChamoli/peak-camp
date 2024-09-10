import { Request, Response, NextFunction } from "express"
import jwt, { JwtHeader } from "jsonwebtoken"
import { authorizationHeaderSchema } from "../zod";
import { JWT_SECRET,HttpStatusCode } from "../utils";
import {jwtDecode} from "jwt-decode"

interface CustomJwtHeader extends JwtHeader{
    userId?: string
}

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
        const payload=jwtDecode<CustomJwtHeader>(token, {header:true})
        const userId=payload.userId
        req.userId=userId
        next()
    }
    catch(err){
        res.status(HttpStatusCode.UNAUTHORIZED).json({
            message: "User not logged in"
        })
        return;
    }  
}