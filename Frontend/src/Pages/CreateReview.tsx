import SmallButton from "../Components/SmallButton";
import BigButton from "../Components/BigButton";
import Heading from "../Components/Heading";
import InputBox from "../Components/InputBox";
import TextArea from "../Components/TextArea";
import RatingStar from "../Components/RatingStar";

export default function CreateReview(){
    return(
        <div className="h-screen w-screen flex justify-center items-center">
            <div className="h-2/3 w-1/2 bg-primary">
                <div className="p-6">
                    <Heading label="New Review: Mumbai"/>
                    <div className="text-white">Leave a rating</div>
                    <RatingStar/>
                    <TextArea label="" placeholder="Write a review for this campground..." rows={5}/>
                    <BigButton label="Add Review!"/>
                    <SmallButton/>
                </div>
            </div>
        </div>   
    )
}