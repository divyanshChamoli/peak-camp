import { Schema, model, connect } from "mongoose"
const mongoose = import("mongoose")

export const connectToDB=async ()=>{
    try{
        (await mongoose).connect("mongodb+srv://divyanshchamoli:wxvn7144@cluster0.qrzriqj.mongodb.net/camping-webapp")
        console.log("DB connected")
    }
    catch(err){
        console.log("DB not connected",err)
    }
}

export interface User{
    username: string ,
    password: string,
    // campsCreated: <Array typeof Ty> 
}

export interface Camp{
    campName: string,
    campDescription: string,
    campLocation: string,
    campPrice: number,
    //image
}

export interface Review{
    reviewText: string,
    rating: number
}

const UserSchema= new Schema({
    username: { type: String, unique:true},
    password: String,
    campsCreated: [{
        type: Schema.Types.ObjectId,
        ref: "Camp"
    }],
    reviewsCreated: [{
        type: Schema.Types.ObjectId,
        ref: "Review"
    }]
})

const CampSchema=new Schema({
    campName: String,
    campDescription:String,
    campLocation:String,
    campPrice: String,
    reviewsOnCamp:[{
        type: Schema.Types.ObjectId,
        ref: "Review" 
    }],
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
})

const ReviewSchema=new Schema({
    reviewText: String,
    rating: Number,
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    camp: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
})

export const User = model("User", UserSchema)
export const Camp = model("Camp", CampSchema)
export const Review = model("Review", ReviewSchema)



