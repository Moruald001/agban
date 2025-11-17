import React from "react";
import { Link } from "react-router-dom";
import succesGif from "../../assets/icons8-success.gif";

export default function Verify() {
  return (
    <div className="w-screen  h-screen flex flex-col justify-center items-center gap-3">
      <img src={succesGif} alt="gif succès animé" />
      <h1 className="text-2xl">Votre email à été vérifié avec succès</h1>
      <Link
        to={"/login"}
        className=" bg-gray-600 p-3 rounded-lg opacity-80 text-white font-center  hover:scale-115 transition-transform duration-300  "
      >
        Se connecter
      </Link>
    </div>
  );
}
