import React from "react";
import Success from "../../assets/succes-ico.png";

export default function SuccessRegistry() {
  return (
    <div className="relative w-screen h-screen">
      <div className="absolute left-140 top-10 flex flex-col justify-center items-center">
        <img src={Success} alt="icône de succès" className=" w-50  mb-10" />
        <p className="w-[30em] text-center">
          Votre inscription à réussi , nous vous avons envoyé un email de
          confirmation à votre adresse
        </p>
      </div>
    </div>
  );
}
