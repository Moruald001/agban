import { useMutation, useQuery } from "@tanstack/react-query";
import { deleteList, getList } from "../../utils/otherFetcher";
import { ArrowLeft, Pen, PlusSquare, UserRoundPlus } from "lucide-react";
import { Trash } from "lucide-react";
import toast from "react-hot-toast";
import { CreateListModal } from "../components/CreateListModal";
import { useEffect, useState } from "react";
import { SyncLoader } from "react-spinners";
import { formatDate } from "../../utils/formatDate";
import { Link } from "react-router-dom";
import NavBar from "../components/NavBar";
import useAuthStore from "../../store/useAuthStore";
import { Button } from "@headlessui/react";
import useClientStore from "../../store/clientStore";

export const List = () => {
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModaltype] = useState("createList");
  const [listId, setListId] = useState(null);
  const { isAuthenticated } = useAuthStore();
  const { create } = useClientStore();

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["lists"],
    queryFn: getList,
    enabled: isAuthenticated === true ? true : false,
    refetchOnWindowFocus: false,
  });
  useEffect(() => {
    create(data);
  }, []);
  const { mutateAsync } = useMutation({
    mutationFn: deleteList,
  });

  const handleUpdate = async (id) => {
    await setModaltype("updateList");
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
        <Button
          onClick={() => {
            setShowModal(true);
            setModaltype("createList");
          }}
          className={
            "fixed bottom-[10vh] right-8 bg-gray-600 p-3 rounded-lg opacity-80 text-white font-center cursor-pointer hover:scale-110 transition-transform duration-600  "
          }
        >
          Créer une liste
        </Button>
        {data?.lists?.length > 0 ? (
          <div className=" overflow-x-hidden shadow-[10px_10px_40px_black]/20 min-w-[70vw]  bg-gray-900/5 rounded-box h-auto mx-5  ">
            <div className="overflow-x-auto rounded-box border border-base-content/5      ">
              <table className="table table-zebra hover   rounded-box  ">
                {/* head */}
                <thead>
                  <tr>
                    <th>Nom</th>
                    <th>Date de creation</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {data?.lists.map((list) => (
                    <tr key={list.id}>
                      <td className="capitalize">
                        <Link to={`/list-details/${list.id}`} className="">
                          {list.name}
                        </Link>{" "}
                      </td>
                      <td>{formatDate(list.createdAt)} </td>
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
            </div>
          </div>
        ) : (
          <p className="p-4 text-center text-gray-400">
            Aucune liste pour le moment
          </p>
        )}
      </div>
      <CreateListModal
        listId={listId}
        modalType={modalType}
        showModal={showModal}
        location="list"
        onClose={() => {
          setShowModal(false);
        }}
      />
    </>
  );
};
