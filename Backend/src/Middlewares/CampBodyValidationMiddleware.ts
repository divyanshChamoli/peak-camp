import { NextFunction, Request, Response } from "express";
import { campBodySchema } from "../zod";
import { HttpStatusCode } from "..";

export const CampBodyValidationMiddleware=(req: Request, res: Response, next: NextFunction): void=>{
    const campData =req.body 
    const result=campBodySchema.safeParse(campData);
    if(!result.success){
        res.status(HttpStatusCode.BAD_REQUEST).json({
            message: "Error"
        })
        return;
    }
    next()
}