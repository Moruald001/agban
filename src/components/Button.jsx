// import { useState } from "react";
import { Link } from "react-router-dom";

export const Btn = ({
  title,
  animation = "",
  position = "",
  weight = "",
  fontStyle = "",
}) => {
  return (
    <>
      <Link
        className={
          "bg-gray-600 p-3 rounded-3xl text-white font-center font-exo  duration-300 ease-in-out hover:scale-75 transition-transform " +
          animation +
          position +
          weight +
          fontStyle
        }
        to={"/add-client"}
      >
        {title}
      </Link>
    </>
  );
};
