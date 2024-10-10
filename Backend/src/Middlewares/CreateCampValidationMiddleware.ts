import { NextFunction, Request, Response } from "express";
import { CreateCampBodySchema } from "../zod";
import { HttpStatusCode } from "../utils";

export const CreateCampValidationMiddleware=(req: Request, res: Response, next: NextFunction): void=>{
    const campData =req.body 
    
    //Since we are using FormData, convert campPrice datatype to number
    if(campData.campPrice){
        campData.campPrice = parseInt(campData.campPrice)
    }
    const result=CreateCampBodySchema.safeParse(campData);
    if(!result.success){
        res.status(HttpStatusCode.BAD_REQUEST).json({
            message: "Invalid inputs"
        })
        return;
    }
    next()
}