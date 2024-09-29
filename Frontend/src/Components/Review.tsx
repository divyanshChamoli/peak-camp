import { Rating } from "@material-tailwind/react"
import axios from "axios"
import { useEffect, useState } from "react"
import RatingStar from "./RatingStar"

interface ReviewProps{
    reviewText: string,
    rating: number,
    userId: string
}

export default function Review( {reviewText, rating, userId} : ReviewProps ){
    const [fullName, setFullName] = useState("")

    useEffect(()=>{
        axios.get(`http://localhost:3000/user/${userId}`)
        .then((res)=>{
            setFullName(res.data.user.firstName+" "+res.data.user.lastName)
        })
    }, [fullName])
    
    return(
        <div className="bg-secondary p-4 pb-6 my-2 rounded-md" >
            <Rating value={rating} unratedColor="amber" ratedColor="amber" readonly/>
            <div className="text-white capitalize">{fullName}</div>
            <div className="text-white text-sm font-light"> {reviewText} </div>
        </div>
    )
}