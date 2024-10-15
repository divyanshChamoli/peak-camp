import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../Context/AuthProvider";

const RequireAuth = () => {
  const { authToken } = useAuth();
  const location = useLocation()

  return <div>
    {authToken 
    ? <Outlet /> 
    : <Navigate to={"/signin"}  state={{ from: location }} replace/>}
    </div>;
};

export default RequireAuth;
