import React, { useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import useClientStore from "../../store/clientStore";
import NavBar from "../components/NavBar";
import { PDFDownloadLink } from "@react-pdf/renderer";
import ClientListPDF from "../components/ClientListPdf"; // ajuste le chemin si nécessaire

import {
  ArrowLeft,
  Check,
  Image,
  PanelsRightBottom,
  Pen,
  Plus,
  Redo,
  Trash,
} from "lucide-react";
import { Button } from "@headlessui/react";
import { AddClientModal } from "../components/AddClientModal";
import { useMutation, useQuery } from "@tanstack/react-query";
import useAuthStore from "../../store/useAuthStore";
import {
  archivedList,
  deleteClient,
  delivredClient,
  delivredList,
  getList,
} from "../../utils/otherFetcher";

import toast from "react-hot-toast";
import ImagesDisplayModal from "../components/ImagesDisplayModal";
import useWindowSize from "../components/useWindowsSize";
import Card from "../components/Card";
import { mutate } from "../../utils/mutationHelper";

export default function ListDetails() {
  const listId = useParams();
  const idNumber = Number(listId.id);
  const [showModal, setShowModal] = useState(false);
  const [showImageModal, SetShowImageModal] = useState(false);
  const { width } = useWindowSize();
  const { user } = useAuthStore();

  // const { user, isAuthenticated } = useAuthStore();
  const [clientId, setClientId] = useState();
  const [modalType, setModalType] = useState("createClient");
  const { lists } = useClientStore();

  const { mutateAsync } = useMutation({ mutationFn: deleteClient });
  const listSelected = lists?.find((list) => list.id == idNumber);
  const client = listSelected?.clients?.find((client) => client.id == clientId);

  const formatStatus = (status) => {
    if (status) {
      return "Garder";
    } else {
      return "libérer";
    }
  };
  const toFinishList = mutate(delivredList);
  const toArchived = mutate(archivedList);
  const toDelivredClient = mutate(delivredClient);

  const finishedList = async (id, delivred) => {
    const response = confirm("vous êtes sur le point de terminer  cette liste");
    if (!response) {
      return;
    }

    try {
      toFinishList({ data: delivred, id: id });
      toast.success("Liste terminée");
      window.location.reload();
    } catch (error) {
      console.log(error);
      toast.error(` ${error}`);
    }
  };

  const handleArchived = async (id, archived) => {
    try {
      await toArchived({ data: archived, id: id });
    } catch (error) {
      console.log(error);
      toast.error(`Echec de l’opération`);
    }
  };

  const handleDelivredClient = async (id, delivred) => {
    try {
      await toDelivredClient({ data: delivred, id: id });
      window.location.reload();
    } catch (error) {
      console.log(error);
      toast.error(`Echec de l’opération`);
    }
  };

  const handleUpdate = async (clientId) => {
    await setModalType("updateClient");
    await setShowModal(true);
    await setClientId(clientId);
  };

  const handleDelete = async (clientId) => {
    const response = confirm("vous êtes sur le point de supprimer cette liste");
    if (!response) {
      return;
    }
    try {
      await mutateAsync(clientId);
      toast.success("Suppression effectué");
      window.location.reload();
    } catch (error) {
      console.log(error);
      toast.error(` ${error}`);
    }
  };

  return (
    <>
      <NavBar />
      <Link
        to={"/list"}
        className="ml-10 mt-10 p-2  w-auto hover:hover:bg-slate-800/65 hover:text-white rounded-box  duration-300  transition-colors inline-block cursor-pointe self-start"
      >
        <ArrowLeft className="" />
      </Link>
      {user?.role === "ceo" && (
        <Button
          onClick={() => {
            setShowModal(true);
          }}
          className={
            "fixed w-auto bottom-[10vh] right-8 bg-gray-600 p-3 rounded-lg opacity-80 text-white font-center cursor-pointer hover:scale-110 transition-transform duration-600 z-50 "
          }
        >
          <Plus className="inline" /> Un client
        </Button>
      )}
      <div>
        <h1 className="text-center text-2xl mt-[7vh]">
          {listSelected?.name}
          {listSelected?.delivred === false ? "" : `(Terminée)`}{" "}
        </h1>
        {listSelected && (
          <div className="flex justify-center mt-4">
            <PDFDownloadLink
              document={<ClientListPDF list={listSelected} />}
              fileName={`liste-${listSelected.name}.pdf`}
              className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors duration-300"
            >
              {({ loading }) =>
                loading ? "Génération du PDF..." : "Télécharger en PDF"
              }
            </PDFDownloadLink>
          </div>
        )}

        {width >= 610 ? (
          <div className="overflow-x-auto w-screen h-screen flex justify-center items-start mt-[8vh]">
            {listSelected?.clients.length > 0 ? (
              <div className="relative">
                <table className="table table-xs w-[70vw] ">
                  <thead>
                    <tr>
                      <th>Nom</th>
                      <th>Contact</th>
                      <th>Description</th>
                      <th>Images</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {listSelected?.clients.map((client) => (
                      <tr
                        key={client.id}
                        className={`${
                          client.delivred === true && "line-through"
                        }`}
                      >
                        <td>{client.name}</td>
                        <td>{client.contact}</td>
                        <td>{client.description}</td>
                        <td>
                          <button
                            className="cursor-pointer hover:scale-110 transition-transform duration-300"
                            onClick={() => {
                              setClientId(client.id), SetShowImageModal(true);
                            }}
                          >
                            <Image />{" "}
                          </button>
                        </td>
                        <td>{formatStatus(client.keep)}</td>
                        <td className=" flex items-center h-1/2 relative">
                          <div className="dropdown dropdown-center  ">
                            <button
                              tabIndex={0}
                              role="button"
                              className="p-1 cursor-pointer scale-125 hover:scale-150 transition-all duration-300 text-2xl absolute bottom-[-1em]"
                            >
                              ...
                            </button>
                            <div
                              tabIndex="-1"
                              className="dropdown-content bg-base-400 back rounded-box z-1 w-auto p-2 mr-10 shadow-sm flex gap-4 items-center backdrop-blur-lg p-1"
                            >
                              <button
                                className="cursor-pointer hover:scale-105 transition-transform duration-300 "
                                onClick={() => handleUpdate(client.id)}
                              >
                                <Pen color="black" className="" />
                              </button>
                              <button
                                className="cursor-pointer hover:scale-105 transition-transform duration-300 "
                                onClick={() => handleDelete(client.id)}
                              >
                                <Trash color="black" />
                              </button>
                              <button
                                className="cursor-pointer hover:scale-105 transition-transform duration-300 "
                                onClick={() =>
                                  handleDelivredClient(
                                    client.id,
                                    !client.delivred
                                  )
                                }
                              >
                                {!client.delivred ? (
                                  <Check color="black" />
                                ) : (
                                  <Redo />
                                )}
                              </button>
                            </div>
                          </div>
                        </td>{" "}
                      </tr>
                    ))}
                  </tbody>
                </table>
                <Button
                  className="m-4 cursor-pointer absolute left-1/3 btn btn-ghost text-black "
                  onClick={() => {
                    finishedList(listSelected?.id, !listSelected?.delivred);
                    handleArchived(listSelected?.id, !listSelected?.archived);
                  }}
                >
                  {listSelected?.delivred === false
                    ? "Terminer liste"
                    : " Activer liste"}
                </Button>
              </div>
            ) : (
              <p className="p-4 text-center text-gray-400">
                Aucune client pour le moment
              </p>
            )}
          </div>
        ) : (
          listSelected?.clients.map((client) => (
            <Card
              key={client.id}
              name={client.name}
              contact={client.contact}
              description={client.description}
              status={formatStatus(client.keep)}
              client={client}
            />
          ))
        )}
        <Button
          className="m-4 cursor-pointer absolute left-1/3 btn btn-ghost text-black "
          onClick={() =>
            finishedList(listSelected?.id, !listSelected?.delivred)
          }
        >
          Terminer liste
        </Button>

        <ImagesDisplayModal
          showModal={showImageModal}
          onClose={() => {
            SetShowImageModal(false);
          }}
          client={client}
        />
        <AddClientModal
          modalType={modalType}
          showModal={showModal}
          listId={idNumber}
          clientId={clientId}
          onClose={() => {
            setShowModal(false);
          }}
        />
      </div>
    </>
  );
}
