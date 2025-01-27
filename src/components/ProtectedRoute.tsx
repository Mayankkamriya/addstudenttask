import { ReactNode } from "react"; 
import { Navigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/config";

type ProtectedRouteProps = {
  children: ReactNode; // Define the type for children
};

// /* eslint-disable-next-line react/prop-types */
const ProtectedRoute = ({ children }:ProtectedRouteProps) => {
  const [user, loading] = useAuthState(auth);

  if (loading) {
    return <div>Loading...</div>; // Show a loading indicator while checking authentication
  }

  return user ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
