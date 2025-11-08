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
        </div>
      </div>
    </>
  );
}
