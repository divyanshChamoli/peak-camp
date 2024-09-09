import { Schema, model, connect, Types } from "mongoose"
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

connectToDB()

export interface User{
    username: string ,
    password: string,
    campsCreated:  Types.ObjectId[]
    reviewsCreated: Types.ObjectId[]
}

export interface Camp{
    campName: string,
    campDescription: string,
    campLocation: string,
    campPrice: number,
    reviewsOnCamp: Types.ObjectId[]
    user: Types.ObjectId
    //image
}

export interface Review{
    reviewText: string,
    rating: number,
    user: Types.ObjectId,
    camp: Types.ObjectId
}

const UserSchema= new Schema<User>({
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

const CampSchema=new Schema<Camp>({
    campName: String,
    campDescription:String,
    campLocation:String,
    campPrice: String,
    reviewsOnCamp:[{
        type: Schema.Types.ObjectId,
        ref: "Review", 
        required: true
    }],
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
})

const ReviewSchema=new Schema<Review>({
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

export const User = model<User>("User", UserSchema)
export const Camp = model<Camp>("Camp", CampSchema)
export const Review = model<Review>("Review", ReviewSchema)



