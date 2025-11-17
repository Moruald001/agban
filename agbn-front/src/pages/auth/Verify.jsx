import React from "react";
import { Link } from "react-router-dom";

export default function Verify() {
  return (
    <div>
      <h1>Votre email à été vérifié avec succès</h1>
      <Link
        to={"/login"}
        className="w-auto h-1.5 bg-gray-700 text-white hover:scale-125 transition-transform duration-300"
      >
        Se connecter
      </Link>
    </div>
  );
}
