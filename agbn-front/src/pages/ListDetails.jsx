import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import useClientStore from "../../store/clientStore";
import NavBar from "../components/NavBar";
import { ArrowLeft, Pen, Plus, Trash } from "lucide-react";
import { Button } from "@headlessui/react";
import { AddClientModal } from "../components/AddClientModal";
import { useQuery } from "@tanstack/react-query";
import useAuthStore from "../../store/useAuthStore";
import { getList } from "../../utils/otherFetcher";

export default function ListDetails() {
  const listId = useParams();
  const { lists } = useClientStore();
  const idNumber = Number(listId.id);
  const [showModal, setShowModal] = useState(false);
  const { isAuthenticated } = useAuthStore();

  const { data } = useQuery({
    queryKey: ["lists"],
    queryFn: getList,
    enabled: isAuthenticated === true ? true : false,
    refetchOnWindowFocus: false,
  });
  const listSelected = data?.lists?.find((list) => list.id == idNumber);

  const formatStatus = (status) => {
    if (status) {
      return "Garder";
    } else {
      return "libérer";
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
          "fixed w-auto bottom-[10vh] right-8 bg-gray-600 p-3 rounded-lg opacity-80 text-white font-center cursor-pointer hover:scale-110 transition-transform duration-600  "
        }
      >
        <Plus className="inline" /> Un client
      </Button>
      <div>
        <h1 className="text-center text-2xl mt-[7vh]">{listSelected?.name} </h1>
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
                    <td>{client.contact} </td>
                    <td>{client.description}</td>
                    <td>fjkljdlafdj</td>
                    <td> {formatStatus(client.keep)}</td>
                    <td className="flex gap-4 items-center">
                      <button
                        className="cursor-pointer hover:scale-105 transition-transform duration-300 "
                        onClick={() => handleUpdate(listSelected.id)}
                      >
                        <Pen color="black" size={15} className="" />
                      </button>
                      <button
                        className="cursor-pointer hover:scale-105 transition-transform duration-300 "
                        onClick={() => handleDelete(listSelected.id)}
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
        <AddClientModal
          showModal={showModal}
          listId={listSelected?.id}
          onClose={() => {
            setShowModal(false);
          }}
        />
      </div>
    </>
  );
}
