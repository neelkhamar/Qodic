import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

const PublicRoute = ({ element, ...rest }: any) => {
  const useAuth = useSelector((state: any) => state.auth);
  const location = useLocation();
  if (useAuth?.token) {
    // Redirect to login page, and save the current location
    return <Navigate to="/dashboard" state={{ from: location }} replace />;
  }

  return element; // Render the protected component
};

export default PublicRoute;
