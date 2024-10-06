import MapGlobe from "../Components/MapGlobe";
import NavBar from "../Components/Navbar";
import ViewAllCamps from "../Components/ViewAllCamps";

export default function HomePage(){
    return(
        <>
            <NavBar/>
            <div className="bg-[#FAEDCD] flex justify-center items-center gap-5 h-[33rem]">
                <MapGlobe/>
            </div>
            <div className="overflow-x-hidden bg-customYellow">
                <ViewAllCamps/>
            </div>
        </>
    )
}