import SmallButton from "../Components/SmallButton";
import BigButton from "../Components/BigButton";
import Heading from "../Components/Heading";
import InputBox from "../Components/InputBox";
import TextArea from "../Components/TextArea";
import { useState } from "react";
import axios from "axios";

export default function CreateCampground(){
    const [name, setName] = useState("")
    const [location, setLocation] = useState("")
    const [price, setPrice] = useState(0)
    const [imageUrl, setImageUrl] = useState("")
    const [description, setDescription] = useState("")
    
    const onClick= async ()=>{
        try{
            const res=await axios.post("http://localhost:3000/camp",{
                campName: name, 
                campDescription: description,
                campLocation: location,
                campPrice: price,
                // imageUrl ??
            },{
                headers:{
                    Authorization: "Bearer " + localStorage.getItem("token")
                }
            })
            console.log(res.data)
        }
        catch(e){
            console.log(e)
        }
    }
    
    return(
        <div className="h-screen w-screen flex justify-center items-center">
            <div className="h-[75%] w-1/2 bg-primary">
                <div className="p-6">
                    <Heading label="Add Campground"/>
                    <InputBox label="Name" placeholder="Name of the campground" value={name} onChange={e=>setName(e.target.value)} />
                    <InputBox label="Location" placeholder="Address, or latitube longitude to display on Google Maps" value={location} onChange={e=>setLocation(e.target.value)} />
                    <InputBox label="Price" placeholder="Price in INR" type="number" value={price} onChange={e=>setPrice(parseInt(e.target.value))} />
                    <InputBox label="Image Url" placeholder="Paste the website url of the image here" value={imageUrl} onChange={e=>setImageUrl(e.target.value)} />
                    <TextArea label="Description" placeholder="Share your experience!" rows={2} value={description} onChange={e=>setDescription(e.target.value)} />
                    <BigButton label="Add Campground!" onClick={onClick}/>
                    <SmallButton/>
                </div>
            </div>
        </div>     
    )
}