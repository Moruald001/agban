import React, { useState } from "react";
import ImagesDisplayModal from "./ImagesDisplayModal";
import { Check, Image, Redo, Trash } from "lucide-react";

export default function Card({
  name,
  contact,
  description,
  status,
  client,
  role,
  onDelivred,
  onDelete,
  onUpdate,
}) {
  const [showImageModal, SetShowImageModal] = useState(false);

  return (
    <div className="w-[90vw] h-auto flex justify-center overflow-hidden ml-5 mt-10 p-3 ">
      <div className="card w-full bg-base-100 card-md shadow-lg  ">
        <div className="card-body p-2 relative ">
          <h2 className={`card-title ${client?.delivred && "line-through"}`}>
            {name}{" "}
          </h2>
          <button
            className="cursor-pointer hover:scale-105 transition-transform duration-300 absolute right-2"
            onClick={() => onDelivred(client.id, !client.delivred)}
          >
            {!client.delivred ? <Check color="black" /> : <Redo />}
          </button>
          <div className="flex wrap-break-word px-1">
            <p className="w-[10vw] inline-block">{description}</p>
          </div>
          <div>
            <div className="flex justify-start gap-30 py-4 text-gray-400 text-lg">
              <span>Status</span>
              <span>Contacts</span>
            </div>
            <div className="flex justify-between wrap-break-word ">
              <h3
                className={`font-semi-bold ${
                  status !== "Garder" ? "text-green-900" : " text-red-300"
                }`}
              >
                {status}{" "}
              </h3>
              <div className="w-[40vw]">
                <span className="">{contact}</span>
              </div>
            </div>
          </div>
          <div className=" card-actions">
            <div className="flex gap-2 justify-center w-full">
              {role === "ceo" && (
                <button
                  className="cursor-pointer hover:scale-105 transition-transform duration-300 "
                  onClick={() => onUpdate(client.id)}
                >
                  <Pen color="black" className="" />
                </button>
              )}
              {role === "ceo" && (
                <button
                  className="cursor-pointer hover:scale-105 transition-transform duration-300 "
                  onClick={() => onDelete(client.id)}
                >
                  <Trash color="black" />
                </button>
              )}
            </div>
            <button
              className="cursor-pointer hover:scale-110 transition-transform duration-300 w-full bg-gray-500 p-2 flex justify-center rounded-lg"
              onClick={() => {
                SetShowImageModal(true);
              }}
            >
              <Image color="white" />{" "}
            </button>
          </div>
        </div>
      </div>
      <ImagesDisplayModal
        showModal={showImageModal}
        onClose={() => {
          SetShowImageModal(false);
        }}
        client={client}
      />
    </div>
  );
}
