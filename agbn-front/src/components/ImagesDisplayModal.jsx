import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function ImagesDisplayModal({ showModal, client, onClose }) {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImg, setSelectedImg] = useState(null);

  // const BASE_URL = import.meta.env.VITE_API_URL;
  useEffect(() => {
    setIsLoading(true);
  }, []);
  setTimeout(() => {
    setIsLoading(false);
  }, 5000);

  return (
    <>
      <Transition appear show={showModal} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={() => {}} static>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg text-center font-medium leading-6 text-gray-900"
                  >
                    {client?.name + "  photos"}
                  </Dialog.Title>
                  <div className="mt-2 p-5  columns-2  h-auto ">
                    {isLoading ? (
                      <div className="">
                        <Skeleton className="p-4 w-30 h-40 m-4" />
                        <Skeleton className="p-4 w-30 h-20 m-4" />
                        <Skeleton className="p-4 w-30 h-80 m-4" />
                        <Skeleton className="p-4 w-30 h-40 m-4" />
                      </div>
                    ) : client?.imgs.length > 0 ? (
                      client?.imgs.map((image) => (
                        <img
                          key={image.key}
                          src={`${image.img}`}
                          className="w-auto h-auto rounded-box shadow-lg mt-2 p-2 border-2 border-gray-600/20 cursor-pointer"
                          onClick={() => setSelectedImg(image.img)}
                        />
                      ))
                    ) : (
                      <p>Aucunes photos</p>
                    )}
                  </div>

                  <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-lg border border-transparent bg-gray-500 px-4 py-2 text-sm font-medium text-white hover:bg-gray-700 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 cursor-pointer transition-colors duration-300"
                      onClick={onClose}
                    >
                      Fermer
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
      {selectedImg && (
        <div
          className="fixed inset-0 z-50  bg-black/50  flex items-center justify-center p-4"
          onClick={() => setSelectedImg(null)}
        >
          <img
            src={`${selectedImg}`}
            alt="image agrandie"
            className="max-w-full max-h-full rounded-lg shadow-2xl transition-discrete duration-300 "
            onClick={(e) => e.stopPropagation()} // empêche la fermeture si on clique sur l'image
          />
        </div>
      )}
    </>
  );
}
