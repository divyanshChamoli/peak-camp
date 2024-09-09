import { NextFunction, Request, Response } from "express";
import { UpdateCampBodySchema } from "../zod";
import { HttpStatusCode } from "../utils";

export const UpdateCampValidationMiddleware=(req: Request, res: Response, next: NextFunction): void=>{
    const campData =req.body 
    const result=UpdateCampBodySchema.safeParse(campData);
    if(!result.success){
        res.status(HttpStatusCode.BAD_REQUEST).json({
            message: "Error"
        })
        return;
    }
    next()
}