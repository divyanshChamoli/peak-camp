import DisplayAverageRating from "./DisplayAverageRating";

interface ViewSingleCampProps{
    campId: string
    campName: string,
    campImageUrl: string,
    onClick(e: React.MouseEvent<HTMLImageElement>): void,
    reviewsOnCamp: string[]
}

export default function ViewSingleCamp({
        campId,
        campName,
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
        </figure>
    )       
}