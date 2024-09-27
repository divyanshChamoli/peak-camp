import Heading from "../Components/Heading";
import TextArea from "../Components/TextArea";
import Button from "../Components/Button";
import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Rating } from "@material-tailwind/react";
import { useState } from "react";
import axios from "axios";

export default function CreateReview(){
    const [rating, setRating] = useState(4)
    const [description, setDescription] = useState("")
    
    const navigate=useNavigate()
    
    const sendToBackend=async ()=>{
        //CampId id is hardcoded in post request !!!
        try{
            const res= await axios.post("http://localhost:3000/review/66f5359f1635c0dad1ac92d4",{
                reviewText: description,
                rating: rating
            },{
                headers:{
                    Authorization: "Bearer " + localStorage.getItem("token")
                }
            })
            // if(!res.data.Error){
            //     //Navigate to that camp !!!
            //     navigate("/")
            // }    
        }
        catch(e){
            console.log(e)
        }
        setDescription("")

    }
    
    return(
        <div className="h-screen w-screen flex justify-center items-center">
            <div className="h-3/5 w-1/2 bg-primary">
                <div className="p-6">
                    <Heading label="New Review: Mumbai"/>
                    <div className="text-lg font-montserrat font-semibold">Leave a rating!</div>
                    <Rating value={rating} unratedColor="amber" ratedColor="amber" onChange={(value)=>setRating(value)}/>
                    <TextArea rows={5} placeholder="Write a review for this campground..."
                        value={description}  onChange={(e)=>{setDescription(e.target.value)}} />
                    <Button className="w-full rounded-sm mb-3 text-lg" size={"icon"} onClick={sendToBackend}>
                        Add Review!
                    </Button>
                    <Button size={"iconSmall"} onClick={()=>navigate("/viewcamp")}>
                        <ChevronLeft size={15}/> Back
                    </Button>
                </div>
            </div>
        </div>   
    )
}