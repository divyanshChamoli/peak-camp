import InputBoxSquare from "../Components/InputBoxSquare";
import { NavLink } from "react-router-dom";
import ButtonCreateAccount from "../Components/ButtonCreateAccount";

export default function Signin(){
    return(
        <div className="w-screen h-screen bg-black flex justify-center items-center bg-[url('https://images.pexels.com/photos/2509093/pexels-photo-2509093.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')] bg-cover bg-center">
            <div className="sm:w-[30rem] w-full p-5 grid gap-5">
                <h2 className="text-5xl pb-4 font-sriracha text-center">Login</h2>
                <InputBoxSquare placeholder="Username"/>
                <InputBoxSquare placeholder="Password"/>
                <ButtonCreateAccount placeholder="Enter"/>
                <div className=" w-full text-center">
                    No account? <NavLink className={"text-yellow"} to={"/signup"}>Register Now</NavLink>
                </div>
                
            </div>
        </div>
    )
}