export default function NavBar() {
  return (
    <div>
      <div className="navbar bg-none shadow-sm">
        <div className="flex-1">
          <a className="btn btn-ghost text-Md">AGBAN</a>
        </div>
        <div className="flex gap-4 items-center">
          <p className="capitalize">ro</p>
          <button className="capitalize btn btn-neutral opacity-60">
            deconnexion
          </button>
        </div>
      </div>
    </div>
  );
}
