import axios from "axios";
import ViewSingleCamp from "./ViewSingleCamp";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ViewAllCamps(){
    const navigate= useNavigate()
    

    interface AllCamps{
        _id: string,
        campName: string,
        campDescription?: string,
        campLocation?: string,
        campPrice: number,
        campImageUrl: string,
        reviewsOnCamp: string[]
    }
    
    const [camps, setCamps] = useState<AllCamps[]>([])            

    useEffect(()=>{
        axios.get("http://localhost:3000/camp")
        .then((res)=>{
            setCamps(res.data.camps)
        })
    },[])

    return(
        <div className="w-screen flex justify-center pt-16  ">
            <div className="grid grid-cols-2 gap-x-28 gap-y-12">
                {camps.map((camp)=>{
                    return(
                        <ViewSingleCamp key={camp._id} campName={camp.campName} campImageUrl={camp.campImageUrl}  reviewsOnCamp={camp.reviewsOnCamp}
                            campId={camp._id} campPrice={camp.campPrice}
                            onClick={()=>navigate(`/entercamp/${camp._id}`)} />
                    )
                })}
            </div>
        </div>
    )
}