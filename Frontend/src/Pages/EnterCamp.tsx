import { useNavigate, useParams } from "react-router-dom";
import AllReviews from "../Components/AllReviews";
import EnterCampCard from "../Components/EnterCampCard";
// import Campground from "../Components/Campground";
// import CampgroundCard from "../Components/CampgroundCard";
import Map from "../Components/Map";
import Button from "../Components/Button";

type RouteParams = {
    campId : string
}

export default function EnterCamp(){
    const navigate= useNavigate()
    const {campId} = useParams<RouteParams>();

    //campId doesnt exist, necessary hack otherwise TS assumes campId can be string | undefined
    if(!campId){
        navigate("/home")
        return <></>
    }
    
    return(
        // <div className="w-screen flex justify-center pt-40 ">
        //     <div className="w-2/3 grid gap-8">
        //         <div className="bg-primary rounded-sm ">
        //             <EnterCampCard campId={campId} />
        //         </div>
        //         <div className="">
        //             <AllReviews campId={campId} /> 
        //         </div>
        //     </div>
        // </div>

        // DONT DELETE FOR NOW!!!
        <div className="w-screen flex justify-center pt-40 ">
            <div className="w-2/3 grid grid-cols-3 gap-8">
                <div className="bg-primary rounded-sm col-span-2">
                    <EnterCampCard campId={campId} />
                </div>
                <div className=" bg-[#E5E3DF] rounded-sm col-span-1 flex justify-center items-center h-[30rem] border-white shadow-md" >
                    <Map/>
                </div>
                <div className="col-span-2">
                    <AllReviews campId={campId} /> 
                </div>
            </div>
        </div>
    )
}