import { Router,Request,Response } from "express";
import { Camp } from "../Database";
import { UserAuthenticationMiddleware } from "../Middlewares/UserAuthenticationMiddleware";
import { CampBodyValidationMiddleware } from "../Middlewares/CampBodyValidationMiddleware";
const router=Router()

//get all camps
// 2) Camp
// create a camp
// get all camps
// get a camp "/:campId"
// get all camps created by that user "/camps/:userId"
// delete a camp "/:campId" 
// update a camp "/:campId"


router.get('/camps', async (req:Request, res:Response)=>{
    try{
        let camps:Camp[]=await Camp.find({})
        res.json({
            camps:camps
        })
    }
    catch(err){
        console.log(err)
        res.json({
            message:"Error"
        })
    }
})

//create a new camp for a user
router.post('/camp/:user',UserAuthenticationMiddleware, CampBodyValidationMiddleware, async (req:Request, res:Response)=>{
    //user ObjectId from url
    const user=req.params.user
    try{
        //body has the first 4 + user + reviewsOnCamp will be empty when the camp is created
        await Camp.create({...req.body, user, reviewsOnCamp: []})
        res.json({
            message: "Successfully created Camp"
        })
    }
    catch(err){
        console.log(err)
        res.json({
            message:"Error"
        })
    }
})

module.exports = router