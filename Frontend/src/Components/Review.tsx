import { Rating } from "@material-tailwind/react"
import axios from "axios"
import { useEffect, useState } from "react"
import Button from "./Button"
import { Trash } from "lucide-react"

interface ReviewProps{
    reviewId: string,
    reviewText: string,
    rating: number,
    userId: string
}   

export default function Review( {reviewText, rating, userId, reviewId} : ReviewProps ){    
    const [fullName, setFullName] = useState("")
    
    useEffect(()=>{
        axios.get(`http://localhost:3000/user/${userId}`)
        .then((res)=>{
            setFullName(res.data.user.firstName+" "+res.data.user.lastName)
        })
    }, [fullName])

    const handleDelete=async ()=>{
        try{
            const res= await axios.delete(`http://localhost:3000/review/${reviewId}`,{
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token")
                }
            })
        }
        catch(err){
          console.log(err)
          alert("Something went wrong")
        }
      }
    
    return(
        <div className="bg-secondary p-4 pb-6 my-2 rounded-md relative" >
            <Rating value={rating} unratedColor="amber" ratedColor="amber" readonly/>
            <div className="text-white capitalize">{fullName}</div>
            <div className="text-white text-sm font-light"> {reviewText} </div>
            <Button size={"icon"} className="bg-red-600 hover:bg-red-900 absolute right-4 bottom-5" onClick={handleDelete}>
                Delete &nbsp; <Trash size={18}/>
            </Button>
        </div>
    )
}