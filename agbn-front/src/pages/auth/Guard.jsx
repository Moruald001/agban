// GuestRoute.jsx
import { Navigate } from "react-router-dom";
import useAuthStore from "../../../store/useAuthStore";
import toast from "react-hot-toast";

export const Guard = ({ children }) => {
  const { isAuthenticated } = useAuthStore();

  if (isAuthenticated === true) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export const Protected = ({ children }) => {
  const { isAuthenticated } = useAuthStore();

  if (isAuthenticated === false) {
    toast("Veuillez vous connecter");
    return <Navigate to="/login" />;
  }

  return children;
};

export const Verified = ({ children }) => {
  const { user } = useAuthStore();

  if (user?.isVerified === false) {
    toast("Veuillez valider votre email svp");
    return <Navigate to="/" />;
  }

  return children;
};
