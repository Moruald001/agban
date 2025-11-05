import React, { useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import useClientStore from "../../store/clientStore";
import NavBar from "../components/NavBar";
import { PDFDownloadLink } from "@react-pdf/renderer";
import ClientListPDF from "../components/ClientListPdf"; // ajuste le chemin si nécessaire

import {
  ArrowLeft,
  Image,
  PanelsRightBottom,
  Pen,
  Plus,
  Trash,
} from "lucide-react";
import { Button } from "@headlessui/react";
import { AddClientModal } from "../components/AddClientModal";
import { useMutation, useQuery } from "@tanstack/react-query";
import useAuthStore from "../../store/useAuthStore";
import { deleteClient, getList } from "../../utils/otherFetcher";

import toast from "react-hot-toast";
import ImagesDisplayModal from "../components/ImagesDisplayModal";
import useWindowSize from "../components/useWindowsSize";
import Card from "../components/Card";

export default function ListDetails() {
  const listId = useParams();
  const idNumber = Number(listId.id);
  const [showModal, setShowModal] = useState(false);
  const [showImageModal, SetShowImageModal] = useState(false);
  const { width } = useWindowSize();
  console.log(width);

  const { isAuthenticated } = useAuthStore();
  const [clientId, setClientId] = useState();
  const [modalType, setModalType] = useState("createClient");
  const { lists, create } = useClientStore();

  // const { data, refetch } = useQuery({
  //   queryKey: ["lists"],
  //   queryFn: getList,
  //   enabled: isAuthenticated === true ? true : false,
  //   refetchOnWindowFocus: false,
  // });

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
      await refetch();
      window.location.reload();
    } catch (error) {
      console.log(error);
      toast.error(`Erreur lors de la suppression ${error}`);
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
      <div>
        <h1 className="text-center text-2xl mt-[7vh]">{listSelected?.name} </h1>
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
              <table className="table table-xs w-[70vw]">
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
                    <tr key={client.id}>
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
                      <td className="flex gap-4 items-center">
                        <button
                          className="cursor-pointer hover:scale-105 transition-transform duration-300 "
                          onClick={() => handleUpdate(client.id)}
                        >
                          <Pen color="black" size={15} className="" />
                        </button>
                        <button
                          className="cursor-pointer hover:scale-105 transition-transform duration-300 "
                          onClick={() => handleDelete(client.id)}
                        >
                          <Trash color="black" size={15} />
                        </button>
                      </td>{" "}
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="p-4 text-center text-gray-400">
                Aucune client pour le moment
              </p>
            )}{" "}
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
