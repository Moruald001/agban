import toast from "react-hot-toast";
import useAuthStore from "../../store/useAuthStore";
import { useMutation } from "@tanstack/react-query";
import { doLogout } from "../../utils/authFetcher";
import { useQueryClient } from "@tanstack/react-query";
import useClientStore from "../../store/clientStore";
import { Link } from "react-router-dom";

export default function NavBar() {
  const { user, isAuthenticated, logout } = useAuthStore();
  const { remove } = useClientStore();
  const { mutateAsync, isPending } = useMutation({
    mutationFn: doLogout,
  });

  const queryClient = useQueryClient();

  const handleLogout = async () => {
    const response = confirm("Voulez vous vraiment vous deconnecter?");
    if (!response) return;
    try {
      const res = await mutateAsync();
      queryClient.cancelQueries(); // arrête les requêtes en cours
      queryClient.removeQueries();
      queryClient.clear();
      await localStorage.removeItem("user-list");
      await localStorage.removeItem("user-storage");
      res && toast.success(res.message);
      logout();
      remove();
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
            <details className="dropdown">
              <summary className="btn m-1">{user?.name} </summary>
              <ul className="menu dropdown-content bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
                <li>
                  <Link to={"/profil"}>Profil</Link>
                </li>
              </ul>
            </details>
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
