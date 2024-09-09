import { NextFunction, Request, Response } from "express";
import { CreateCampBodySchema } from "../zod";
import { HttpStatusCode } from "../utils";

export const CreateCampValidationMiddleware=(req: Request, res: Response, next: NextFunction): void=>{
    const campData =req.body 
    const result=CreateCampBodySchema.safeParse(campData);
    if(!result.success){
        res.status(HttpStatusCode.BAD_REQUEST).json({
            message: "Error"
        })
        return;
    }
    next()
}