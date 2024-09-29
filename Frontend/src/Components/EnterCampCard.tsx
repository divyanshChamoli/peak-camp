import axios from "axios"
import { useEffect, useState } from "react"

interface EnterCampCardProps{
    campId: string
}

interface Camp{
    campName: string,
    campDescription: string,
    campLocation: string,
    campPrice: number,
    campImageUrl: string,
    user: string
    // reviewsOnCamp: Types.ObjectId[]
    //image
}

export default function EnterCampCard( {campId} : EnterCampCardProps){
    const [camp, setCamp] = useState<Camp>()
    const [firstName, setFirstName] = useState("")
    
    useEffect(()=>{

        async function getData(){
            const response=await axios.get( `http://localhost:3000/camp/${campId}`)
            setCamp(response.data.camp)
            const res=await axios.get(`http://localhost:3000/user/${camp?.user}`)
            setFirstName(res.data.firstName)
        }

        getData()

    },[firstName])

    
    return(
        <div>
            <figure className="p-4">
                <img className="object-cover"  src={camp?.campImageUrl} alt={camp?.campName} />
                <figcaption className=" text-white text-xl text-right font-montserrat pt-2"> ₹{camp?.campPrice}/night </figcaption>
                <figcaption className="font-sriracha text-3xl text-white"> {camp?.campName} </figcaption>
                <figcaption className="text-white bg-secondary p-4 my-4 text-sm"> {camp?.campDescription} </figcaption>
                <figcaption className=" text-white text-sm text-right"> Submitted by <span className="underline">{firstName}</span> </figcaption>
            </figure>
        </div>
    )
}