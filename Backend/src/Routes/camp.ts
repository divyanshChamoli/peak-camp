import { Router,Request,Response } from "express";
import { Camp, User } from "../db";
import { UserAuthenticationMiddleware } from "../Middlewares/UserAuthenticationMiddleware";
import { CreateCampValidationMiddleware } from "../Middlewares/CreateCampValidationMiddleware";
import { UpdateCampValidationMiddleware } from "../Middlewares/UpdateCampValidationMiddleware";
import { CreateCampBodyType, UpdateCampBodyType } from "../zod";
import Geocoding from "@mapbox/mapbox-sdk/services/geocoding";
const mapBoxAccessToken = "pk.eyJ1IjoiZGl2eWFuc2gwMDgiLCJhIjoiY2xnMmtrNm50MDBlajNscXlmbTJzdHl1MCJ9.-UvFiDZ4Z83OYJ9y3mZYew"
const geocoder = Geocoding({accessToken: mapBoxAccessToken})

import multer from "multer"
import {storage} from "../cloudinary"
const upload = multer({ storage })

const router=Router()

//get all camps
// 2) Camp
// create a camp
// get all camps
// get a camp "/:campId"
// get all camps created by that user "/camps/:userId"
// delete a camp "/:campId" 
// update a camp "/:campId"

// //create a new camp for a user
// router.post('/', CreateCampValidationMiddleware, async (req:Request, res:Response)=>{
//     const geoData=await geocoder.forwardGeocode({
//         query: 'Paris, France',
//         limit: 1
//     }).send()
//     console.log(geoData.body.features[0].geometry)
//     res.send("Ok")

// })

router.post("/",upload.array('images', 5) ,(req,res)=>{

    const files = req.files as Express.Multer.File[]
    const images =  files.map((image)=>{
        return{
            url: image.path,
            fileName: image.filename
        }
    })
    console.log(images)
    res.json({
        body: req.body,
        file: req.files
    })

})


// //create a new camp for a user
// router.post('/',UserAuthenticationMiddleware, CreateCampValidationMiddleware, async (req:Request, res:Response)=>{
//     //user ObjectId from locals
//     const userId=res.locals.userId;
//     const campBody: CreateCampBodyType= req.body
//     const geoData=await geocoder.forwardGeocode({
//         query: campBody.campLocation,
//         limit: 1
//     }).send()
//     const geometry=geoData.body.features[0].geometry
//     try{
//         //body has the first 4 + user + geometry + reviewsOnCamp will be empty when the camp is created
//         const camp= await Camp.create({...campBody, user:userId, geometry})
//         if(!camp){
//             console.log("Camp not created")
//             throw new Error("Camp not created")
//         }
//         const user=await User.findByIdAndUpdate(userId,{
//             $push: {campsCreated: camp}
//         })
//         if(!user){
//             console.log("User not found")
//             throw new Error("User not found")
//         }
//         res.json({
//             message: "Successfully created Camp"
//         })
//     }
//     catch(err){
//         console.log(err)
//         res.json({
//             Error :"Error"
//         })
//     }
// })

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

//delete a camp
//can create a CampAuthorizationMiddleware to check if this camp belongs to the user logged in
router.delete(":campId",UserAuthenticationMiddleware ,async (req: Request, res: Response)=>{
    const campId=req.params.campId;
    try{
        const deletedCamp=await Camp.findByIdAndDelete(campId)
        if(!deletedCamp){
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

//update camp data
//can create a CampAuthorizationMiddleware to check if this camp belongs to the user logged in
router.put("/:campId",UserAuthenticationMiddleware, UpdateCampValidationMiddleware ,async (req: Request, res:Response)=>{
    const campId=req.params.campId;
    const campBody: UpdateCampBodyType=req.body
    try{
        const camp = await Camp.findById(campId);
        if(!camp){
            console.log("Camp not found")
            throw new Error("Camp not found")
        }  

        //If location is updated, geometry should also update for updated map display
        if(campBody.campLocation){
            const geoData=await geocoder.forwardGeocode({
                query: campBody.campLocation,
                limit: 1
            }).send()
            const geometry= geoData.body.features[0].geometry
            await Camp.findByIdAndUpdate(campId,{...campBody,geometry})
        }
        //else geometry shouldnt be touched
        else{
            await Camp.findByIdAndUpdate(campId,{...campBody})
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