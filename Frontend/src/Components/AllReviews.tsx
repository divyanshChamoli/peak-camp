import { Pencil } from "lucide-react";
import Button from "./Button";
// import RatingStar from "./RatingStar";
import Review from "./Review";
import { useNavigate } from "react-router-dom";

export default function AllReviews(){
    const navigate= useNavigate()
    
    return(
        <div className="bg-primary p-3">
            {/* <RatingStar/> */}
            <div>3 reviews</div>
            <div>Average Rating: <b>3.67</b></div>
            <div className="flex w-full justify-end">
                <Button size={"icon"} onClick={()=>navigate("/createreview")} >
                    Add Review<Pencil size={18} fill="white" color="#AC7D36"/>
                </Button>
            </div>
            <div className="pb-4 text-lg">
                    Recent Reviews:
            </div>
            <hr className="pb-2"/>
            <Review/>
            <Review/>
            <Review/>
            <Review/>
        </div>
    )
}