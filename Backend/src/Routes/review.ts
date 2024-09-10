import { Router, Request,Response } from "express";
import { CreateReviewBodyValidationMiddleware } from "../Middlewares/CreateReviewBodyValidationMiddleware";
import { UserAuthenticationMiddleware } from "../Middlewares/UserAuthenticationMiddleware";
import { CreateReviewBodyType } from "../zod";
import { Review } from "../Database";
const router=Router();

// 3) Review
// create a review on a camp "/review/:campId"
// get all reviews on a camp "/reviews/campId"
// delete 
// update

router.post("/:campId",UserAuthenticationMiddleware ,CreateReviewBodyValidationMiddleware ,async (req: Request, res: Response)=>{
    const campId=req.params.campId;
    const reviewBody:CreateReviewBodyType =req.body
    try{
        const review=await Review.create({...reviewBody}, )
        if(!reviewBody){
            console.log("Camp not found")
            throw new Error("Camp not found")
        }
        res.json({
            message: "Camp deleted successfully"
        })
    }
    catch(err){
        console.log(err)
        res.json({
            message: "Error"
        })
    }    
})

module.exports = router