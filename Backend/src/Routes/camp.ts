import { Router,Request,Response } from "express";
import { Camp, Review, User } from "../db";
import { UserAuthenticationMiddleware } from "../Middlewares/UserAuthenticationMiddleware";
import { CreateCampValidationMiddleware } from "../Middlewares/CreateCampValidationMiddleware";
import { UpdateCampValidationMiddleware } from "../Middlewares/UpdateCampValidationMiddleware";
import { CreateCampBodyType, UpdateCampBodyType } from "../zod";
import Geocoding from "@mapbox/mapbox-sdk/services/geocoding";
const MAPBOX_ACCESS_TOKEN= process.env.MAPBOX_ACCESS_TOKEN as string
const geocoder = Geocoding({accessToken: MAPBOX_ACCESS_TOKEN})

import multer from "multer"
import {storage} from "../cloudinary"
const upload = multer({ storage })

const router=Router()

//create a new camp for a user
router.post('/', UserAuthenticationMiddleware, upload.array('images', 10), CreateCampValidationMiddleware ,async (req:Request, res:Response)=>{
    //user ObjectId from locals
    const userId=res.locals.userId;
    const campBody: CreateCampBodyType= req.body
    const files = req.files as Express.Multer.File[]
    const images =  files.map((image)=>{
        return{
            url: image.path,
            fileName: image.filename
        }
    })
    
    try{
        const geoData=await geocoder.forwardGeocode({
            query: campBody.campLocation,
            limit: 1
        }).send()
    
        //When a location that doesnt exist is entered, geoData.body.features array is empty=> there is no features[0]
        if(geoData.body.features.length === 0){
            console.log("Features not defined")
            res.json({
                Error: "Invalid location"
            })
        }
        const geometry=geoData.body.features[0].geometry
        
        //body has the first 4 + user + geometry + images + reviewsOnCamp will be empty when the camp is created
        const camp= await Camp.create({...campBody, user:userId, geometry, images})
        if(!camp){
            console.log("Camp not created")
            throw new Error("Camp not created")
        }
        const user=await User.findByIdAndUpdate(userId,{
            $push: {campsCreated: camp}
        })
        if(!user){
            console.log("User not found")
            throw new Error("User not found")
        }
        res.json({
            message: "Successfully created Camp"
        })
    }
    catch(err){
        console.log(err)
        res.json({
            Error :"Error"
        })
    }
})

// get all camps
router.get('/', async (req:Request, res:Response)=>{
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


//get a camp by camp id
router.get("/:campId",async (req: Request, res: Response)=>{
    const campId=req.params.campId;
    try{
        const camp=await Camp.findById(campId)
        if(!camp){
            console.log("Camp not found")
            throw new Error("Camp not found")
        }
        res.json({
            camp: camp
        })
    }
    catch(err){
        console.log(err)
        res.json({
            message: "Error"
        })
    }
})

// get all camps created by that User
router.get(("/camps/:userId"), async (req:Request, res:Response)=>{
    const userId=req.params.userId;
    try{
        const user=await User.findById(userId);
        if(!user){
            console.log("User doesnt exist")
            throw new Error("User doesnt exist")
        }
        const campIds=user.campsCreated
        let camps:Camp[]=[];
        const dummyArray=campIds.map(async (campId)=>{
            const camp=await Camp.findById(campId)
            if(!camp){
                console.log("camp not found")
                throw new Error("camp not found")
            }
            camps.push(camp)
        })
        //We have to wait for dummyArray to evaluate asynchrounously. Otherwise camps will be an empty array
        const dummyArray2= await Promise.all(dummyArray)
        res.json(camps)
    }
    catch(err){
        console.log(err)
        res.json({
            message:"Error"
        })
    }
})

//delete a camp: 1) Delete camp 2) Delete campId from campsCreated from User 3) Delete all reviews created on that camp from Review 
//can create a CampAuthorizationMiddleware to check if this camp belongs to the user logged in
router.delete("/:campId",UserAuthenticationMiddleware ,async (req: Request, res: Response)=>{
    const userId=res.locals.userId
    const campId=req.params.campId;
    try{
        const camp=await Camp.findById(campId)
        if(!camp){
            console.log("Camp not found")
            throw new Error("Camp not found")
        }
        if(camp.user.toString() !== userId){
            console.log("User is not authorized to delete camp")
            throw new Error("User is not authorized to delete camp")
        }
        
        // Delete camp
        await Camp.findByIdAndDelete(campId)

        //Delete from User
        await User.findByIdAndUpdate(userId,
            {$pullAll: { campsCreated: [campId] } },
            {new: true}
        )        

        //Delete all reviews on that camp
        await Review.deleteMany({camp: campId})
                
        res.json({
            message: "Camp deleted successfully"
        })
    }
    catch(err){
        console.log(err)
        res.json({
            Error: err
        })
    }
})

//update camp data
//can create a CampAuthorizationMiddleware to check if this camp belongs to the user logged in
router.put("/:campId",UserAuthenticationMiddleware, upload.array('images', 10), UpdateCampValidationMiddleware ,async (req: Request, res:Response)=>{
    const campId=req.params.campId;
    const campBody: UpdateCampBodyType=req.body
    const files = req.files as Express.Multer.File[]
    const images =  files.map((image)=>{
        return{
            url: image.path,
            fileName: image.filename
        }
    })
    try{
        const camp = await Camp.findById(campId);
        if(!camp){
            console.log("Camp not found")
            throw new Error("Camp not found")
        }  

        //TODO: As of now every field is being updated, because we send every thing from frontend. Optimise this
        //If location is updated, geometry should also update for updated map display. 
        //This if else is useless as of now as location is sent from frontend always
        if(campBody.campLocation){
            const geoData=await geocoder.forwardGeocode({
                query: campBody.campLocation,
                limit: 1
            }).send()
            //When a location that doesnt exist is entered, geoData.body.features array is empty=> there is no features[0]
            if(geoData.body.features.length === 0){
                console.log("Features not defined")
                res.json({
                    Error: "Invalid location"
                })
            }
            const geometry= geoData.body.features[0].geometry
            await Camp.findByIdAndUpdate(campId,{...campBody, geometry, images})
        }
        //else geometry shouldnt be touched
        else{
            await Camp.findByIdAndUpdate(campId,{...campBody, images})
        }
        res.json({
            message: "Camp updated successfully"
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