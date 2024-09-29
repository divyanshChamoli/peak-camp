import DisplayAverageRating from "./DisplayAverageRating";
import RatingStar from "./RatingStar";

//viewsinglecamp
//viewallcamps
//entercamp
//entercampcard
//createcamp


interface ViewSingleCampProps{
    campId: string
    campName: string,
    campPrice: number,
    campImageUrl: string,
    onClick(e: React.MouseEvent<HTMLImageElement>): void,
    reviewsOnCamp: string[]
}

export default function ViewSingleCamp({
        campId,
        campName,
        campPrice,
        campImageUrl,
        onClick,
        reviewsOnCamp
    }:ViewSingleCampProps){
    
    return(
        <figure className="relative h-96 w-[26rem] " >
            <img className="object-cover h-96 w-[26rem] blur-sm hover:blur-none "  src={campImageUrl} alt={campName} onClick={onClick}/>
            <figcaption className="absolute font-sriracha text-2xl text-white bottom-20 right-4 "> {campName} </figcaption>
            <figcaption className="absolute bottom-10 right-4 "> <DisplayAverageRating campId={campId} /> </figcaption>
            <figcaption className="absolute bottom-6 right-4 text-white text-sm"> {reviewsOnCamp.length} reviews </figcaption>
            {/* <figcaption className="absolute text-lg font-montserrat font-bold text-white top-6 left-4 "> ₹{campPrice}  </figcaption> */}
        </figure>
    )       
}