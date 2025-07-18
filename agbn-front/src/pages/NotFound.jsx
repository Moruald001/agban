import React, { Component, useState } from "react";
import { Navigate } from "react-router-dom";

export function NotFound() {
  const [timer, setTimer] = useState(false);
  setTimeout(() => {
    setTimer(true);
  }, 2000);

  return (
    <div>
      <h1 className="scale-125">Oups mauvaise page🤷</h1>
      {timer && <Navigate to="/" />}
    </div>
  );
}
