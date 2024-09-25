import RatingStar from "./RatingStar"

export default function Review(){
    return(
        <div className="bg-secondary p-4 pb-6 my-2 rounded-md" >
            <RatingStar/>
            <div className="text-white">Divyansh Chamoli</div>
            <div className="text-white text-sm font-light">Good camp!</div>
        </div>
    )
}