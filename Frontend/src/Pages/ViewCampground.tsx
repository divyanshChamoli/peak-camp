import AllReviews from "../Components/AllReviews";
import Campground from "../Components/Campground";
import CampgroundCard from "../Components/CampgroundCard";
import Map from "../Components/Map";

export default function ViewCampground(){
    return(
        <div className="w-screen flex justify-center pt-40">
            <div className="w-2/3 grid grid-cols-3 gap-8">
                <div className="bg-primary rounded-sm col-span-2">
                    <CampgroundCard/>
                </div>
                <div className="bg-slate-400 rounded-sm col-span-1">
                    <Map/>
                </div>
                <div className="col-span-2">
                    <AllReviews/> 
                </div>
            </div>
        </div>
    )
}