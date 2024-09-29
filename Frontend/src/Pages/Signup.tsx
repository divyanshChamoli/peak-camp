import InputBoxSquare from "../Components/InputBoxSquare";
import { NavLink, useNavigate } from "react-router-dom";
import ButtonCreateAccount from "../Components/Button/ButtonCreateAccount";
import { useState } from "react";
import axios from "axios";

export default function Signup(){
    const [firstName, setFirstName]= useState("")
    const [lastName, setLastName]= useState("")
    const [password, setPassword]= useState("")
    const [email, setEmail]= useState("")

    const navigate= useNavigate()
    
    const onClick=async ()=>{
        try{
            const res=await axios.post("http://localhost:3000/user/signup",{
                firstName,
                lastName,
                username: email,
                password
            })
            console.log(res.data)
            if(!res.data.Error){
                alert("Successfully Registered")
                navigate("/signin")
            }
        }
        catch(e){
            alert("Error! Please try again")
            console.log(e)
        }
        setFirstName("")
        setLastName("")
        setEmail("")
        setPassword("")
    }
    
    return(
        <div className="w-screen h-screen bg-black flex justify-center items-center bg-[url('https://images.unsplash.com/photo-1517824806704-9040b037703b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] bg-cover bg-bottom">
            <div className="sm:w-[35rem] p-5 w-full grid sm:grid-cols-2 gap-5">
                <h2 className="text-5xl pb-4  font-montserrat font-semibold sm:col-span-2 text-center">REGISTER</h2>
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
                <div className=" w-full sm:col-span-2 text-center ">
                    Already have an account? <NavLink className={"text-yellow underline"} to={"/signin"}>Login</NavLink>
                </div>
            </div>
        </div>
    )
}