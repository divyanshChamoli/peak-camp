import BigButton from "../Components/Button/BigButton";
import Button from "../Components/Button";
import ButtonCreateAccount from "../Components/Button/ButtonCreateAccount";
import ButtonRightIcon from "../Components/Button/ButtonRightIcon";
import SmallButton from "../Components/Button/SmallButton";
import TransparentButton from "../Components/Button/TransparentButton";
import { Map, Pencil } from "lucide-react";

export default function ErrorPage(){
    return(
        <div className="h-screen w-screen p-10">
            <Button size={"icon"} className="w-60">
                <Map size={20} fill="white" color="#AC7D36"/>Topo Map
            </Button>
            <Button size={"icon"} className="w-auto">
                Add Review<Pencil size={15} fill="white" color="#AC7D36"/>
            </Button>
            
            <Button>
                Register    
            </Button>

            <BigButton label="Big Button" onClick={()=>{}} />
            <ButtonCreateAccount placeholder="Button Create Account" onClick={()=>{}}/>    
            <ButtonRightIcon/>    <br></br>
            <SmallButton/>  <br></br>
            <TransparentButton/>
        </div>        
    )
}