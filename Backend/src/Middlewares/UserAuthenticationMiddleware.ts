import { Request, Response, NextFunction } from "express"
import jwt, { JwtPayload } from "jsonwebtoken"
import { HttpStatusCode } from "../utils";

export const UserAuthenticationMiddleware = (req: Request, res: Response, next: NextFunction) :void=>{
    const authorization=req.headers.authorization;
    const JWT_SECRET = process.env.JWT_SECRET as string

    if(!authorization || !authorization.startsWith("Bearer ")){
        res.status(HttpStatusCode.UNAUTHORIZED).json({
            Error: "User not logged in"
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
            Error: "User not logged in"
        })
        return;
    }  
}