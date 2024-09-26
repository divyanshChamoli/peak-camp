import InputBoxSquare from "../Components/InputBoxSquare";
import { NavLink } from "react-router-dom";
import ButtonCreateAccount from "../Components/ButtonCreateAccount";
import { useState } from "react";
import axios from "axios";

export default function Signup(){
    const [firstName, setFirstName]= useState("")
    const [lastName, setLastName]= useState("")
    const [password, setPassword]= useState("")
    const [email, setEmail]= useState("")

    const onClick=async ()=>{
        try{
            const res=await axios.post("http://localhost:3000/user/signup",{
                firstName,
                lastName,
                username: email,
                password
            })
            console.log(res.data)
        }
        catch(e){
            console.log(e)
        }
        setFirstName("")
        setLastName("")
        setEmail("")
        setPassword("")
    }
    
    return(
        <div className="w-screen h-screen bg-black flex justify-center items-center bg-[url('https://images.pexels.com/photos/2509093/pexels-photo-2509093.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')] bg-cover bg-center">
            <div className="sm:w-[35rem] p-5 w-full grid sm:grid-cols-2 gap-5">
                <h2 className="text-5xl pb-4 font-sriracha sm:col-span-2 text-center">Register</h2>
                <div className=" col-span-1">
                    <InputBoxSquare placeholder="First Name" value={firstName} onChange={(e)=>setFirstName(e.target.value)} />
                </div>
                <div className=" col-span-1">
                    <InputBoxSquare placeholder="Last Name"  value={lastName} onChange={(e)=>setLastName(e.target.value)} />
                </div>
                <div className=" sm:col-span-2">
                    <InputBoxSquare placeholder="Email Address" value={email} onChange={(e)=>setEmail(e.target.value)} />
                </div>
                <div className=" sm:col-span-2">
                    <InputBoxSquare placeholder="Password" value={password} type="password" onChange={(e)=>setPassword(e.target.value)} />
                </div>
                <div className=" sm:col-span-2">
                    <ButtonCreateAccount placeholder="Create New Account" onClick={onClick} />
                </div>
                <div className=" w-full sm:col-span-2 text-center">
                    Already have an account? <NavLink className={"text-yellow"} to={"/signin"}>Login</NavLink>
                </div>
            </div>
        </div>
    )
}