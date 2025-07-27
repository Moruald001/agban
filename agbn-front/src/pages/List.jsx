import { useMutation, useQuery } from "@tanstack/react-query";
import { deleteList, getList } from "../../utils/otherFetcher";
import { ArrowLeft, Pen, PlusSquare, UserRoundPlus } from "lucide-react";
import { Trash } from "lucide-react";
import toast from "react-hot-toast";
import { Modal } from "../components/modal";
import { useState } from "react";
import { SyncLoader } from "react-spinners";
import { formatDate } from "../../utils/formatDate";
import { Link } from "react-router-dom";
import NavBar from "../components/NavBar";
import useAuthStore from "../../store/useAuthStore";

export const List = () => {
  const [showModal, setShowModal] = useState(false);
  const [listId, setListId] = useState(null);
  const { isAuthenticated } = useAuthStore();

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["lists"],
    queryFn: getList,
    enabled: isAuthenticated === true ? true : false,
    refetchOnWindowFocus: false,
  });

  const { mutateAsync } = useMutation({
    mutationFn: deleteList,
  });

  const handleUpdate = async (id) => {
    await setShowModal(true);
    await setListId(id);
  };

  const handleDelete = async (id) => {
    const response = confirm("vous êtes sur le point de supprimer cette liste");
    if (!response) {
      return;
    }
    try {
      await mutateAsync(id);
      toast.success("Suppression effectué");
      await refetch();
    } catch (error) {
      console.log(error);
      toast.error(`Erreur lors de la suppression ${error}`);
    }
  };

  if (isLoading) {
    return (
      <div className="w-screen h-screen flex justify-center items-center">
        <SyncLoader color="gray" />
      </div>
    );
  }

  return (
    <>
      <NavBar />
      <div className="w-screen h-screen  flex flex-col justify-start items-center gap-10  ">
        <Link
          to={"/"}
          className="ml-10 mt-10 p-2  w-auto hover:hover:bg-slate-800/65 hover:text-white rounded-box  duration-300  transition-colors inline-block cursor-pointe self-start"
        >
          <ArrowLeft className="" />
        </Link>
        <h1 className="text-2xl text-gray-500 text-center font-bold">
          Toutes les listes
        </h1>
        {data.lists.length > 0 ? (
          <div className=" overflow-x-hidden shadow-[10px_10px_40px_black]/20 min-w-[70vw]  bg-gray-900/5 rounded-box h-auto mx-5  ">
            <div className="overflow-x-auto rounded-box border border-base-content/5      ">
              <table className="table table-zebra hover   rounded-box  ">
                {/* head */}
                <thead>
                  <tr>
                    <th>Nom</th>
                    <th>Date de creation</th>
                    <th>
                      <UserRoundPlus size={18} strokeWidth="3" />
                    </th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {data?.lists.map((list) => (
                    <tr key={list.id}>
                      <td className="capitalize">{list.name} </td>
                      <td>{formatDate(list.createdAt)} </td>
                      <td>
                        <button className="cursor-pointer hover:scale-105  transition-transform duration-300">
                          <PlusSquare size={20} strokeWidth="2" color="green" />
                        </button>
                      </td>

                      <td className="flex gap-4 items-center">
                        <button
                          className="cursor-pointer hover:scale-105 transition-transform duration-300 "
                          onClick={() => handleUpdate(list.id)}
                        >
                          <Pen color="black" size={15} className="" />
                        </button>
                        <button
                          className="cursor-pointer hover:scale-105 transition-transform duration-300 "
                          onClick={() => handleDelete(list.id)}
                        >
                          <Trash color="black" size={15} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <Modal
                location={"list"}
                showModal={showModal}
                modalType="updateList"
                listId={listId}
                onClose={() => {
                  setShowModal(false);
                }}
              />
            </div>
          </div>
        ) : (
          <p className="p-4 text-center text-gray-400">
            Aucune liste pour le moment
          </p>
        )}
      </div>
    </>
  );
};
