import { Pencil } from "lucide-react";
import Button from "./Button";
import Review from "./Review";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "../api/axios";
import DisplayAverageRating from "./DisplayAverageRating";

interface AllReviewsProps{
    campId: string
}

interface Review{
    _id: string
    reviewText: string,
    rating: number,
    user: string,
    camp: string
}


// Repeated logic for displaying rating using <DisplayAverageRating> and calculating average variable. OPTIMISE!    
export default function AllReviews({campId} : AllReviewsProps){
    const navigate= useNavigate()
    
    const [reviews, setReviews] = useState<Review[]>([])
    
    const calculateAverageRating=(reviews: Review[]): number=>{
        if(reviews.length==0){
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
        axios.get(`/review/${campId}`)
        .then((res)=>{
            setReviews(res.data.reviews)
        })
    },[])

    
    const average= calculateAverageRating(reviews)

    console.log(campId)
    return( 
        <div className="bg-primary p-3">
            <DisplayAverageRating campId={campId} />
            <div>{reviews.length} reviews</div>
            <div>Average Rating: <b> {average} </b></div>
            <div className="flex w-full justify-end">
                <Button size={"icon"} onClick={()=>navigate(`/createreview/${campId}`)} >
                    Add Review<Pencil size={18} fill="white" color="#AC7D36"/>
                </Button>
            </div>
            <div className="pb-4 text-lg">
                    Recent Reviews:
            </div>
            <hr className="pb-2"/>
            {reviews.map((review)=>{
                return(
                    <Review key={review._id} rating={review.rating} reviewText={review.reviewText} userId={review.user} reviewId={review._id} />
                )
            })}
        </div>
    )
}