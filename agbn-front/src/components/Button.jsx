// import { useState } from "react";

export const Btn = ({
  title,
  animation = "",
  position = "",
  weight = "",
  fontStyle = "",
  attributes,
  disable,
}) => {
  return (
    <>
      <button
        type={attributes}
        className={`bg-gray-600 p-3 rounded-md text-white font-center font-exo  duration-600 ease-in-out hover:scale-105  transition-transform  cursor-pointer 
          ${animation} 
          ${position} 
          ${weight} 
          ${fontStyle} ${
          disable ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-600"
        }`}
        disabled={disable}
      >
        {title}
      </button>
    </>
  );
};
