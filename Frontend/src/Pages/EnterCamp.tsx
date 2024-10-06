import { useNavigate, useParams } from "react-router-dom";
import AllReviews from "../Components/AllReviews";
import EnterCampCard from "../Components/EnterCampCard";
import NavBar from "../Components/Navbar";
import Map from "../Components/Map";

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
        <div className=" overflow-x-hidden ">
            <div className="static w-full">
                <NavBar/>
            </div>
            <div className="w-screen flex justify-center pt-20 bg-customYellow">
                <div className="w-2/3 grid grid-cols-3 gap-8">
                    <div className="bg-primary col-span-2 shadow-md shadow-black rounded-md">
                        <EnterCampCard campId={campId} />
                    </div>
                    <div className=" bg-[#E5E3DF] rounded-sm col-span-1 flex h-[40rem] border-white shadow-md object-cover" >
                        <Map campId={campId} />
                    </div>
                    <div className="col-span-2 shadow-md shadow-black rounded-md mb-8">
                        <AllReviews campId={campId} /> 
                    </div>
                </div>
            </div>
        </div>
    )
}