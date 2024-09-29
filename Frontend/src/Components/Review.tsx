import { Rating } from "@material-tailwind/react"

interface ReviewProps{
    reviewText: string,
    rating: number
}

export default function Review( {reviewText, rating} : ReviewProps ){
    return(
        <div className="bg-secondary p-4 pb-6 my-2 rounded-md" >
            <Rating value={rating} unratedColor="amber" ratedColor="amber" readonly/>
            <div className="text-white">Divyansh Chamoli</div>
            <div className="text-white text-sm font-light"> {reviewText} </div>
        </div>
    )
}