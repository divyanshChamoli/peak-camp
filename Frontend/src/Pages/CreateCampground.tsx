import SmallButton from "../Components/SmallButton";
import BigButton from "../Components/BigButton";
import Heading from "../Components/Heading";
import InputBox from "../Components/InputBox";
import TextArea from "../Components/TextArea";

export default function CreateCampground(){
    return(
        <div className="h-screen w-screen flex justify-center items-center">
            <div className="h-[75%] w-1/2 bg-primary">
                <div className="p-6">
                    <Heading label="Add Campground"/>
                    <InputBox label="Name" placeholder="Name of the campground" />
                    <InputBox label="Location" placeholder="Address, or latitube longitude to display on Google Maps" />
                    <InputBox label="Price" placeholder="Price in INR" type="number" />
                    <InputBox label="Image Url" placeholder="Paste the website url of the image here" />
                    <TextArea label="Description" placeholder="Share your experience!" rows={2}/>
                    <BigButton label="Add Campground!"/>
                    <SmallButton/>
                </div>
            </div>
        </div>     
    )
}