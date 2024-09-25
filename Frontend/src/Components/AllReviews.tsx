import ButtonRightIcon from "./ButtonRightIcon";
import RatingStar from "./RatingStar";
import Review from "./Review";

export default function AllReviews(){
    return(
        <div className="bg-primary p-3">
            <RatingStar/>
            <div>3 reviews</div>
            <div>Average Rating: <b>3.67</b></div>
            <div className="text-right">
                <ButtonRightIcon/>
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