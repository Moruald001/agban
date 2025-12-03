import useAuthStore from "../store/useAuthStore";
import useClientStore from "../store/clientStore";
import { navigate } from "./navigate";
import toast from "react-hot-toast";

export const apiFetch = async (url, options = {}) => {
  const res = await fetch(url, {
    ...options,
    credentials: "include",
  });

  // Si pas 401 → tout va bien
  if (res.status !== 401) return res;

  // Refresh échoué → déconnexion
  const logout = useAuthStore.getState().logout;
  const remove = useClientStore.getState().remove;

  await localStorage.removeItem("user-list");
  await localStorage.removeItem("user-storage");
  logout();
  remove();
  navigate("/", { replace: true });
  toast("Votre session à expiré");
  logout();

  throw new Error("Session expirée");
};
