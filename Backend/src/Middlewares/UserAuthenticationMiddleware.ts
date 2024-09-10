import { Request, Response, NextFunction } from "express"
import jwt, { JwtPayload } from "jsonwebtoken"
import { AuthorizationHeaderSchema } from "../zod";
import { JWT_SECRET,HttpStatusCode } from "../utils";

export const UserAuthenticationMiddleware = (req: Request, res: Response, next: NextFunction) :void=>{
    const authorization=req.headers.authorization;
    const result=AuthorizationHeaderSchema.safeParse(authorization)
    if(!result.success || !authorization){
        res.status(HttpStatusCode.UNAUTHORIZED).json({
            message: "User not logged in"
        })
        return;
    }
    const token=authorization.split(' ')[1];
    try{
        const decoded=jwt.verify(token,JWT_SECRET) as JwtPayload
        res.locals.userId=decoded.userId
        next()
    }
    catch(err){
        res.status(HttpStatusCode.UNAUTHORIZED).json({
            message: "User not logged in"
        })
        return;
    }  
}