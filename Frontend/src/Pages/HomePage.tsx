import NavBar from "../Components/Navbar";
import ViewAllCamps from "../Components/ViewAllCamps";

export default function HomePage(){
    return(
        <>
            <NavBar/>
            <div className="overflow-x-hidden bg-customYellow">
                <ViewAllCamps/>
            </div>
        </>
    )
}