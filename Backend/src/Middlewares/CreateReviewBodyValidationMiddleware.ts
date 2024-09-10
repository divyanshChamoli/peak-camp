import { NextFunction, Request, Response } from "express";
import { CreateReviewBodySchema } from "../zod";
import { HttpStatusCode } from "../utils";

export const CreateReviewBodyValidationMiddleware=(req: Request, res: Response, next: NextFunction): void=>{
    const reviewData =req.body 
    const result=CreateReviewBodySchema.safeParse(reviewData);
    if(!result.success){
        res.status(HttpStatusCode.BAD_REQUEST).json({
            message: "Invalid inputs"
        })
        return;
    }
    next()
}