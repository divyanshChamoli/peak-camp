import { Express, Request, Response } from "express"

const express=require("express")
const app: Express=express()

app.get('/camps',(req:Request, res:Response)=>{
    res.json({
        camps:"camps"
    })
})

app.listen(3000,()=>{
    console.log("listening")
})


