import NavBar from "./NavBar";

export function Avatar({ name }) {
  const initial = name?.charAt(0)?.toUpperCase() || "?";

  return (
    <div className="w-30 h-30 rounded-full bg-gray-600 text-gray-200 text-4xl flex items-center justify-center font-bold">
      {initial}
    </div>
  );
}
