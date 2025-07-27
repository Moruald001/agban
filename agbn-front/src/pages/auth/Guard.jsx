// GuestRoute.jsx
import { Navigate } from "react-router-dom";
import useAuthStore from "../../../store/useAuthStore";

export const Guard = ({ children }) => {
  const isAuthenticated = useAuthStore();

  if (isAuthenticated === true) {
    return <Navigate to="/" replace />;
  }

  return children;
};
