import React from "react";
import { Avatar } from "../components/Avatar";
import useAuthStore from "../../store/useAuthStore";
import NavBar from "../components/NavBar";

export default function Profil() {
  const { user } = useAuthStore();

  return (
    <>
      <NavBar />
      <div className="flex justify-center items-start h-screen  ">
        <div className="flex flex-col items-center mt-30">
          <Avatar name={user?.name} />
          <span className="capitalize text-2xl">
            {user?.name}
            {`(${user?.role})`}{" "}
          </span>
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
        </div>
      </div>
    </>
  );
}
