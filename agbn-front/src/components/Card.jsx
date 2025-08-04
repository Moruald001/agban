import React, { useState } from "react";
import ImagesDisplayModal from "./ImagesDisplayModal";
import { Image } from "lucide-react";

export default function Card({ name, contact, description, status, client }) {
  const [showImageModal, SetShowImageModal] = useState(false);

  return (
    <div className="w-screen flex justify-center overflow-hidden mt-10 p-8 ">
      <div className="card w-96 bg-base-100 card-md shadow-lg  ">
        <div className="card-body p-2">
          <h2 className="card-title">{name} </h2>
          <p>{description}</p>
          <div>
            <div className="flex justify-between p-4 text-gray-400 text-lg">
              <span>Status</span>
              <span>Contacts</span>
            </div>
            <div className="flex justify-between px-4">
              <h3
                className={`font-semi-bold ${
                  status !== "Garder" ? "text-green-900" : " text-red-300"
                }`}
              >
                {status}{" "}
              </h3>
              <div className="w-[20vw]">
                <h3 className="wrap">{contact} </h3>
              </div>
            </div>
          </div>
          <div className="justify-end card-actions">
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
