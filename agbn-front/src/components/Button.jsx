// import { useState } from "react";

export const Btn = ({
  title,
  animation = "",
  position = "",
  weight = "",
  fontStyle = "",
  attributes,
}) => {
  return (
    <>
      <button
        type={attributes}
        className={
          "bg-gray-600 p-3 rounded-3xl text-white font-center font-exo  duration-300 ease-in-out hover:scale-75 transition-transform cursor-pointer" +
          animation +
          position +
          weight +
          fontStyle
        }
      >
        {title}
      </button>
    </>
  );
};
