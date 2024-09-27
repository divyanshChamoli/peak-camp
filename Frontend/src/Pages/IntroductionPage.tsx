import {Check, ChevronRight } from "lucide-react";
import Logo from "../Components/Logo";
import Button from "../Components/Button";
import { useNavigate } from "react-router-dom";

export default function IntroductionPage(){
    const navigate= useNavigate()
    
    return(
        <div>
            <div className=" w-screen h-screen flex ">
            {/* <div className=" w-screen h-screen grid grid-flow-col md:grid-cols-2"> */}
                <Logo/> 
                <div className="flex justify-center items-center bg-secondary md:flex-shrink-0 ">
                    <div className="flex flex-col gap-3 md:w-[51%] w-4/5">
                        <h2 className="text-5xl font-bold text-green-900 ">Explore the peak camps on Earth!</h2>
                        <p>PeakCamp is a curated list of the best camping spots on Earth. Unfiltered and unbiased reviews</p>
                        <div className="flex"> 
                            <Check color="#14532D" strokeWidth={4}/>
                            <span className="pl-2">Add your own camp suggestions.</span>
                        </div>
                        <div className="flex"> 
                            <Check color="#14532D" strokeWidth={4}/>
                            <span className="pl-2">Leave reviews and experiences</span>
                        </div>
                        <div className="flex"> 
                            <Check color="#14532D" strokeWidth={4}/>
                            <span className="pl-2">See locations for all camps.</span>
                        </div>
                        <Button variant={"green"} onClick={()=>{navigate("/home")}} >
                            View Campgrounds <ChevronRight/>
                        </Button>
                    </div>
                </div>
                <div className="bg-[url('https://images.unsplash.com/photo-1470246973918-29a93221c455?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] bg-cover bg-bottom md:block hidden flex-grow">
                </div>
                        {/* <img className="bg-cover bg-bottom md:block hidden" src="https://images.unsplash.com/photo-1470246973918-29a93221c455?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"  /> */}
            </div>
        </div>
    )
}