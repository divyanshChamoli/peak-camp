import Logo from "./Logo";
import { NavLink } from "react-router-dom";
import Button from "./Button";
import { CirclePlus, LogOut } from "lucide-react";
import { useAuth } from "../Context/AuthProvider";

export default function NavBar() {

  const { authToken, setAuthToken, setCurrentUserId } = useAuth();

  const handleLogout = () => {
    localStorage.removeItem("token");
    setAuthToken(null);
    setCurrentUserId(null);
  };

  return (
    <nav className="w-full h-24 sticky top-0 z-50 bg-[#FAEDCD] flex justify-between items-center shadow-md  shadow-primary">
      <div className="flex justify-center items-center gap-12">
        <NavLink to={"/"}>
          <Logo />
        </NavLink>
        <NavLink to={"/home"}>
          <span className="text-[#99714D] font-extrabold font-montserrat text-lg hover:underline hover:text-primary ">
            Home
          </span>
        </NavLink>
        <NavLink to={"/allusers"}>
          <span className="text-[#99714D] font-extrabold font-montserrat text-lg hover:underline hover:text-primary ">
            Users
          </span>
        </NavLink>
        <NavLink to={"/createCamp"}>
          <Button className="bg-transparent px-6 text-[#99714D] font-bold font-montserrat hover:text-white transition duration-300 ">
            <CirclePlus /> Campground
          </Button>
        </NavLink>
      </div>

      {authToken ? (
        <Button className="bg-primary px-4 mr-10 hover:bg-opacity-95">
          Logout &nbsp; <LogOut size={16} onClick={handleLogout}/>
        </Button>
      ) : (
        <div className="flex justify-center items-center gap-6 pr-10">
          <NavLink to={"/signin"}>
            <span className="text-[#99714D] font-montserrat font-semibold text-md hover:underline hover:text-primary">
              Signin
            </span>
          </NavLink>
          <NavLink to={"/signup"}>
            <Button className="bg-primary w-8 px-10 hover:bg-primary">
              Signup
            </Button>
          </NavLink>
        </div>
      )}
    </nav>
  );
}
