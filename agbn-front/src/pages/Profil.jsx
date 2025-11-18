import React from "react";
import { Avatar } from "../components/Avatar";
import useAuthStore from "../../store/useAuthStore";
import NavBar from "../components/NavBar";
import { useForm } from "react-hook-form";
import { Btn } from "../components/Button";
import { useMutation } from "@tanstack/react-query";
import { doLogout, verificationEmailByUser } from "../../utils/authFetcher";
import useClientStore from "../../store/clientStore";

import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import EmailVerificationModal from "../components/EmailVerificationModal";

export default function Profil() {
  const { user } = useAuthStore();

  return (
    <>
      <NavBar />
      <div className="flex justify-center items-start h-screen  ">
        {!user?.isVerified && (
          <button
            onClick={() => document.getElementById("my_modal_3").showModal()}
            className=" absolute right-35 p-1 btn btn-ghost rounded-lg  text-black cursor-pointer font-center  hover:scale-105 transition-transform duration-300  "
          >
            Verifier email
          </button>
        )}
        <span
          className={`${
            user.isVerified ? "text-green-600" : "text-red-600"
          }  absolute right-2`}
        >
          {" "}
          {user.isVerified ? "Email verifié" : " Email non verifié"}{" "}
        </span>
        <div className="flex flex-col items-center mt-30">
          <Avatar name={user?.name} />
          <span className=" text-2xl">
            {user?.name}
            {`(${user?.role}${user?.role !== "ceo" ? ` de ${user?.ceo}` : ""})`}
          </span>
          {user?.role === "ceo" && (
            <div className="card bg-base-100 w-96 shadow-sm">
              <div className="card-body">
                <h2 className="card-title">Liste de collaborateur</h2>
              </div>
              <figure>
                <ul className="list-none">
                  {user?.collaborators.length > 0 ? (
                    user?.collaborators.map((collaborator) => (
                      <li key={collaborator.id}>{collaborator.name}</li>
                    ))
                  ) : (
                    <p>Aucun collaborateurs pour le moment</p>
                  )}
                </ul>
              </figure>
            </div>
          )}
        </div>
      </div>
      <EmailVerificationModal />
    </>
  );
}
