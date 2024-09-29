import InputBoxSquare from "../Components/InputBoxSquare";
import { NavLink, useNavigate } from "react-router-dom";
import ButtonCreateAccount from "../Components/Button/ButtonCreateAccount";
import { useState } from "react";
import axios from "axios";

export default function Signin(){
    const [password, setPassword]= useState("")
    const [email, setEmail]= useState("")

    const navigate = useNavigate()
    
    const onClick=async ()=>{
        try{
            const res=await axios.post("http://localhost:3000/user/signin",{
                username: email,
                password
            })
            if(res.data.token){
                localStorage.setItem("token", res.data.token)
            }
            if(!res.data.Error){
                // alert("Welcome to PeakCamp!")
                navigate("/home")
            }
        }
        catch(e){
            alert("Error! Please try again")
            console.log(e)
        }
        setEmail("")
        setPassword("")
    }
    // 'https://images.unsplash.com/photo-1682688759157-57988e10ffa8?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    return(
        <div className="w-screen h-screen bg-black flex justify-center items-center bg-[url('https://images.unsplash.com/photo-1517824806704-9040b037703b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] bg-cover bg-bottom">
            <div className="sm:w-[30rem] w-full p-5 grid gap-5">
                <h2 className="text-5xl pb-4 font-montserrat text-center font-semibold">LOGIN</h2>
                <InputBoxSquare placeholder="Email Address" value={email} onChange={(e)=>setEmail(e.target.value)} />
                <InputBoxSquare placeholder="Password" value={password} type="password" onChange={(e)=>setPassword(e.target.value)} />
                <ButtonCreateAccount placeholder="Enter" onClick={onClick} />
                <div className=" w-full text-center">
                    No account? <NavLink className={"text-yellow underline"} to={"/signup"}>Register Now</NavLink>
                </div>
                
            </div>
        </div>
    )
}