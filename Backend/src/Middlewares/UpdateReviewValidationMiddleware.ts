import { Request, Response, NextFunction } from "express";
import { UpdateReviewBodySchema } from "../zod";
import { HttpStatusCode } from "../utils";

export const UpdateReviewValidationMiddleware=(req: Request, res: Response, next: NextFunction)=>{
    const reviewBody =req.body
    const result= UpdateReviewBodySchema.safeParse(reviewBody)
    if(!result.success){
        res.status(HttpStatusCode.BAD_REQUEST).json({
            message: "Invalid inputs"
        })
        return
    }
    next()
}