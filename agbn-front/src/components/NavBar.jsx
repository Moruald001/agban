import toast from "react-hot-toast";
import useAuthStore from "../../store/useAuthStore";
import { useMutation } from "@tanstack/react-query";
import { doLogout } from "../../utils/authFetcher";
import { useQueryClient } from "@tanstack/react-query";
import useClientStore from "../../store/clientStore";

export default function NavBar() {
  const { user, isAuthenticated, logout } = useAuthStore();
  const { remove } = useClientStore();
  const { mutateAsync, isPending } = useMutation({
    mutationFn: doLogout,
  });

  const queryClient = useQueryClient();

  const handleLogout = async () => {
    try {
      const res = await mutateAsync();
      res && toast.success(res.message);
      queryClient.cancelQueries(); // arrête les requêtes en cours
      queryClient.removeQueries();
      queryClient.clear();
      remove();
      logout();
      await localStorage.removeItem("user-storage");
      await localStorage.removeItem("user-list");
    } catch (error) {
      console.log(error);
      toast.error(`${error}`);
    }
  };
  return (
    <div>
      <div className="navbar bg-none shadow-sm px-8">
        <div className="flex-1">
          <a href="/" className=" cursor-pointer text-Md">
            AGBAN
          </a>
        </div>
        {isAuthenticated ? (
          <div className="flex gap-2 items-center">
            <p className="capitalize">{user?.name}: </p>
            <p className=" capitalize">{user?.role}</p>
            <button
              onClick={handleLogout}
              className={`capitalize btn btn-neutral  opacity-60           ${isPending} ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-600"
`}
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
