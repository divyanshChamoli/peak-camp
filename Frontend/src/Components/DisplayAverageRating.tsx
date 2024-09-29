import { Rating } from "@material-tailwind/react"
import axios from "axios"
import { useEffect, useState } from "react"

interface DisplayAverageRatingProps{
    campId: string
}

interface Review{
    _id: string
    reviewText: string,
    rating: number,
    user: string,
    camp: string
}


export default function DisplayAverageRating({campId} : DisplayAverageRatingProps){
    
    const [average, setAverage] = useState(-1)

    const calculateAverageRating=(reviews: Review[]): number=>{
        if(reviews.length===0){
            return 4
        }
        let total=0
        for(let review of reviews){
            total+=review.rating
        }
        let avg = total/(reviews.length)
        let strAvg= avg.toString().substring(0,4)
        return parseFloat(strAvg)
    }

    useEffect(()=>{
        const getData=async()=>{
            const res= await axios.get(`http://localhost:3000/review/${campId}`)
            setAverage(Math.ceil(calculateAverageRating(res.data.reviews))) 
        }
        getData()
    },[])
    

    return(
        <>
            {average==-1?<></>:<Rating value={average} unratedColor="amber" ratedColor="amber" readonly/>}
        </>
    )
}