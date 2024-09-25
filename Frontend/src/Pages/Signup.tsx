import InputBoxSquare from "../Components/InputBoxSquare";
import { NavLink } from "react-router-dom";
import ButtonCreateAccount from "../Components/ButtonCreateAccount";

export default function Signup(){
    return(
        <div className="w-screen h-screen bg-black flex justify-center items-center bg-[url('https://images.pexels.com/photos/2509093/pexels-photo-2509093.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')] bg-cover bg-center">
            <div className="sm:w-[35rem] p-5 w-full grid sm:grid-cols-2 gap-5">
                <h2 className="text-5xl pb-4 font-sriracha sm:col-span-2 text-center">Register</h2>
                <div className=" col-span-1">
                    <InputBoxSquare placeholder="First Name"/>
                </div>
                <div className=" col-span-1">
                    <InputBoxSquare placeholder="Last Name"/>
                </div>
                <div className=" sm:col-span-2">
                    <InputBoxSquare placeholder="Email Address"/>
                </div>
                <div className=" sm:col-span-2">
                    <InputBoxSquare placeholder="Password"/>
                </div>
                <div className=" sm:col-span-2">
                    <ButtonCreateAccount placeholder="Create New Account"/>
                </div>
                <div className=" w-full sm:col-span-2 text-center">
                    Already have an account? <NavLink className={"text-yellow"} to={"/signin"}>Login</NavLink>
                </div>
                
            </div>
        </div>
    )
}