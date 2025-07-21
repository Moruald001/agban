import toast from "react-hot-toast";
import useAuthStore from "../../store/useAuth";
import { useMutation } from "@tanstack/react-query";
import { doLogout } from "../../utils/authFetcher";
import { Link } from "react-router-dom";

export default function NavBar() {
  const { user, isAuthenticated, logout } = useAuthStore();
  const { mutateAsync, isPending } = useMutation({
    mutationFn: doLogout,
  });

  const handleLogout = async () => {
    try {
      const res = await mutateAsync();
      res && toast.success(res.message);
      await logout();
      await localStorage.removeItem("user-storage");
    } catch (error) {
      console.log(error);
      toast.error(`${error}`);
    }
  };
  return (
    <div>
      <div className="navbar bg-none shadow-sm">
        <div className="flex-1">
          <a className="btn btn-ghost text-Md">AGBAN</a>
        </div>
        {isAuthenticated ? (
          <div className="flex gap-4 items-center">
            <p className="capitalize">{user?.name}</p>
            <button
              onClick={handleLogout}
              className="capitalize btn btn-neutral opacity-60"
            >
              {isPending ? "Déconnexion.." : "Déconnecté"}
            </button>{" "}
          </div>
        ) : (
          " "
        )}
      </div>
    </div>
  );
}
