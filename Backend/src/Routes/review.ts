import { Router, Request,Response } from "express";
import { CreateReviewBodyValidationMiddleware } from "../Middlewares/CreateReviewBodyValidationMiddleware";
import { UserAuthenticationMiddleware } from "../Middlewares/UserAuthenticationMiddleware";
import { CreateReviewBodyType, UpdateReviewBodyType } from "../zod";
import { Camp, Review, User } from "../Database";
import { UpdateReviewValidationMiddleware } from "../Middlewares/UpdateReviewValidationMiddleware";
const router=Router();

// 3) Review
// create a review on a camp "/review/:campId"
// get all reviews on a camp "/reviews/campId"
// delete 
// update

//create a review on camp
//1)create review 2)add review to user models' reviewsCreated array 3) add review to camp models' reviewsOnCamp array
router.post("/:campId",UserAuthenticationMiddleware ,CreateReviewBodyValidationMiddleware ,async (req: Request, res: Response)=>{
    const userId=res.locals.userId
    const campId=req.params.campId;
    const reviewBody:CreateReviewBodyType =req.body
    try{
        const review=await Review.create({...reviewBody,user: userId, camp: campId})
        const user=await User.findByIdAndUpdate(userId,{
            $push: {reviewsCreated: review}
        })
        const camp=await Camp.findByIdAndUpdate(campId,{
            $push:{reviewsOnCamp:review}
        })
        if(!user || !camp){
            console.log("User or Camp not found")
            throw new Error("User or Camp not found")
        }
        res.json({
            message: "Review created successfully"
        })
    }
    catch(err){
        console.log(err)
        res.json({
            message: "Error"
        })
    }    
})

//get all reviews on a camp 
router.get("/reviews/:campId",async (req: Request, res: Response)=>{
    const campId=req.params.campId;
    try{
        const reviews= await Review.find({camp: campId})
        if(!reviews){
            console.log("reviews not found")
            throw new Error("reviews not found")
        }

        res.json({
            reviews: reviews
        })
    }
    catch(err){
        console.log(err)
        res.json({
            message: "reviews not found"
        })
    }
})

//delete review
router.delete("/:reviewId",UserAuthenticationMiddleware ,async (req: Request, res: Response)=>{
    const reviewId=req.params.reviewId;
    try{
        const deletedReview=await Review.findByIdAndDelete(reviewId)
        if(!deletedReview){
            console.log("Review not found")
            throw new Error("Review not found")
        }
        res.json({
            message: "Review deleted successfully"
        })
    }
    catch(err){
        console.log(err)
        res.json({
            message: "Error"
        })
    }
})

router.put("/:reviewId",UserAuthenticationMiddleware, UpdateReviewValidationMiddleware ,async (req: Request, res:Response)=>{
    const reviewId=req.params.reviewId;
    const reviewBody: UpdateReviewBodyType=req.body
    try{
        const review=await Review.findByIdAndUpdate(reviewId,{...reviewBody})
        if(!review){
            console.log("Review not found")
            throw new Error("Review not found")
        }  
        res.json({
            message: "Review updated successfully"
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