import RatingStar from "./RatingStar";

//viewsinglecamp
//viewallcamps
//entercamp
//entercampcard
//createcamp


interface ViewSingleCampProps{
    campName: string,
    campDescription?: string,
    campLocation?: string,
    campPrice?: number,
    campImageUrl: string,
    onClick(e: React.MouseEvent<HTMLImageElement>): void
}

export default function ViewSingleCamp({
        campName,
        campDescription,
        campLocation,
        campPrice,
        campImageUrl,
        onClick
    }:ViewSingleCampProps){
    
    
    return(
        <figure className="relative h-96 w-[26rem]" >
            <img className="object-cover h-96 w-[26rem] blur-sm hover:blur-none "  src={campImageUrl} alt={campName} onClick={onClick}/>
            <figcaption className="absolute font-sriracha text-2xl text-white bottom-20 right-4 "> {campName} </figcaption>
            <figcaption className="absolute bottom-10 right-4 "> STAR </figcaption>
            <figcaption className="absolute bottom-6 right-4 text-white text-sm"> 1 reviews </figcaption>
        </figure>
    )       
}