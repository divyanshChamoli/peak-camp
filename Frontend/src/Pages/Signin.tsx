import InputBoxSquare from "../Components/InputBoxSquare";
import { NavLink } from "react-router-dom";
import ButtonCreateAccount from "../Components/Button/ButtonCreateAccount";
import { useState } from "react";
import axios from "axios";

export default function Signin(){
    const [password, setPassword]= useState("")
    const [email, setEmail]= useState("")

    const onClick=async ()=>{
        try{
            const res=await axios.post("http://localhost:3000/user/signin",{
                username: email,
                password
            })
            console.log(res.data)
            if(res.data.token){
                localStorage.setItem("token", res.data.token)
            }
        }
        catch(e){
            console.log(e)
        }
        setEmail("")
        setPassword("")
    }
    
    return(
        <div className="w-screen h-screen bg-black flex justify-center items-center bg-[url('https://images.pexels.com/photos/2509093/pexels-photo-2509093.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')] bg-cover bg-center">
            <div className="sm:w-[30rem] w-full p-5 grid gap-5">
                <h2 className="text-5xl pb-4 font-sriracha text-center">Login</h2>
                <InputBoxSquare placeholder="Email Address" value={email} onChange={(e)=>setEmail(e.target.value)} />
                <InputBoxSquare placeholder="Password" value={password} type="password" onChange={(e)=>setPassword(e.target.value)} />
                <ButtonCreateAccount placeholder="Enter" onClick={onClick} />
                <div className=" w-full text-center">
                    No account? <NavLink className={"text-yellow"} to={"/signup"}>Register Now</NavLink>
                </div>
                
            </div>
        </div>
    )
}