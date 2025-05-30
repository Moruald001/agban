// import { useState } from "react";
import { Link } from "react-router-dom";

export const Btn = () => {
  return (
    <>
      <Link className=" btn " to={"/add-client"}>
        Ajouter un client
      </Link>
    </>
  );
};
