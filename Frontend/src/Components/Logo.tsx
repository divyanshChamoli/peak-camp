import logo from "../assets/Logo.png"

export default function Logo(){
    return(
        <div className="w-32 absolute m-4">
            <img src={logo} alt="Peak Camp" className=""/>
        </div>
    )
}