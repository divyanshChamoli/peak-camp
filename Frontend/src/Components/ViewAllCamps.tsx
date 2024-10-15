import axios from "../api/axios";
import ViewSingleCamp from "./ViewSingleCamp";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface Camp{
    _id: string,
    campName: string,
    campDescription: string,
    campLocation: string,
    campPrice: number,
    images: {
        fileName: string,
        url: string 
    }[],
    geometry: {
        type: 'Point',
        coordinates: number[]
    }
    reviewsOnCamp: string[]
    user: string
  }

export default function ViewAllCamps(){
    const navigate= useNavigate()
    
    const [camps, setCamps] = useState<Camp[]>([])            

    useEffect(()=>{
        axios.get("/camp")
        .then((res)=>{
            setCamps(res.data.camps)
        })
    },[])

    return(
        <div className="w-screen flex justify-center pt-16  ">
            <div className="grid grid-cols-2 gap-x-28 gap-y-12">
                {camps.map((camp)=>{
                    return(
                        <ViewSingleCamp key={camp._id} campName={camp.campName} campImageUrl={camp.images[0].url}  
                            reviewsOnCamp={camp.reviewsOnCamp} campId={camp._id} 
                            onClick={()=>navigate(`/entercamp/${camp._id}`)} />
                    )
                })}
            </div>
        </div>
    )
}