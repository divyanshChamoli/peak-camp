import RatingStar from "./RatingStar";


export default function Campground(){
    return(
        <figure className="relative h-96 w-[26rem]">
            <img className="object-cover h-96 w-[26rem] blur-sm hover:blur-none "  src="https://images.squarespace-cdn.com/content/v1/60d4f8014ef84e488489ea15/128de05e-881d-44c4-aca5-280d5ad82231/BSCC-cabin-60-0131+-+Copy.jpg" alt="Big Sur" />
            <figcaption className="absolute font-sriracha text-2xl text-white bottom-20 right-4 ">Big Sur</figcaption>
            <figcaption className="absolute bottom-10 right-4 "> <RatingStar/> </figcaption>
            <figcaption className="absolute bottom-6 right-4 text-white text-sm"> 1 reviews </figcaption>
        </figure>
    )       
}