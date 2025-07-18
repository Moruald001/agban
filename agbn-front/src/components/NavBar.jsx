import useAuthStore from "../../store/useAuth";

export default function NavBar() {
  const { user, isAuthenticated, logout } = useAuthStore();

  const handleLogout = async () => {
    await logout();
  };
  return (
    <div>
      <div className="navbar bg-none shadow-sm">
        <div className="flex-1">
          <a className="btn btn-ghost text-Md">AGBAN</a>
        </div>
        {isAuthenticated ? (
          <div className="flex gap-4 items-center">
            <p className="capitalize">{user.name}</p>
            <button
              onClick={handleLogout}
              className="capitalize btn btn-neutral opacity-60"
            >
              deconnexion
            </button>{" "}
          </div>
        ) : (
          " "
        )}
      </div>
    </div>
  );
}
