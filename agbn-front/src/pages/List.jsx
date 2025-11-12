import { useQuery } from "@tanstack/react-query";
import {
  archivedList,
  deleteList,
  getList,
  publishList,
} from "../../utils/otherFetcher";
import { Archive, ArrowLeft, Pen } from "lucide-react";
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
import { mutate } from "../../utils/mutationHelper";
import useWindowSize from "../components/useWindowsSize";
import publishICO from "../assets/publish-Ico.png";
import unArchive from "../assets/unarchive.png";
import wifiOff from "../assets/wifi-off.png";

export const List = () => {
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModaltype] = useState("createList");
  const [listId, setListId] = useState(null);
  const { user, isAuthenticated } = useAuthStore();
  const { lists, create } = useClientStore();
  const { width } = useWindowSize();

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["lists", user.id],
    queryFn: ({ queryKey }) => getList(queryKey[1]),
    enabled: isAuthenticated === true ? true : false,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    create(data?.lists);
  }, [data]);

  const archivedLIsts = lists?.filter((list) => list.archived === true);
  const nonArchivedLists = lists?.filter((list) => list.archived === false);
  const [categorySelected, setCategorySelected] = useState("non-archived");
  let listToDisplayed =
    categorySelected === "non-archived" ? nonArchivedLists : archivedLIsts;

  if (user?.role !== "ceo") {
    listToDisplayed = listToDisplayed?.filter((list) => list.publish === true);
  }

  const toDelete = mutate(deleteList);
  const toArchived = mutate(archivedList);
  const toPublish = mutate(publishList);

  const handleUpdate = (id) => {
    setModaltype("updateList");
    setShowModal(true);
    setListId(id);
  };

  const handlePublish = async (id, publish) => {
    const response = confirm("vous êtes sur le point de publier  cette liste");

    if (!response) {
      return;
    }
    try {
      await toPublish({ data: publish, id: id });
      toast.success("operation effectué ");
      await refetch();
    } catch (error) {
      console.log(error);
      toast.error(`Echec de l’opération`);
    }
  };

  const handleArchived = async (id, archived) => {
    try {
      await toArchived({ data: archived, id: id });
      toast.success("operation effectué ");
      await refetch();
    } catch (error) {
      console.log(error);
      toast.error(`Echec de l’opération`);
    }
  };

  const handleDelete = async (id) => {
    const response = confirm("vous êtes sur le point de supprimer cette liste");
    if (!response) {
      return;
    }
    try {
      await toDelete(id);
      toast.success("Suppression effectué");
      await refetch();
    } catch (error) {
      console.log(error);
      toast.error(`Erreur lors de la suppression `);
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
      <div className="w-screen h-screen  flex flex-col justify-start items-center gap-8  ">
        <Link
          to={"/"}
          className="ml-10 mt-10 p-2  w-auto hover:hover:bg-slate-800/65 hover:text-white rounded-box  duration-300  transition-colors inline-block cursor-pointe self-start"
        >
          <ArrowLeft className="" />
        </Link>
        <h1 className="text-2xl text-gray-500 text-center font-bold">
          Toutes les listes
        </h1>
        <div className="flex gap-3  ">
          <Button
            onClick={() => setCategorySelected("non-archived")}
            className={` border-2 border-dotted p-1 rounded-lg  text-black font-center cursor-pointer ${
              categorySelected === "non-archived"
                ? "bg-gray-600 text-white"
                : "bg-transparent  text-black "
            }`}
          >
            Non-archivés
          </Button>
          <Button
            onClick={() => {
              setCategorySelected("archived");
            }}
            className={` border-2 border-dotted p-1 rounded-lg  text-black font-center cursor-pointer ${
              categorySelected === "archived"
                ? "bg-gray-600 text-white"
                : "bg-transparent  text-black "
            }`}
          >
            Archivés
          </Button>
        </div>

        {user?.role === "ceo" && (
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
        )}
        {lists?.length > 0 ? (
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
                  {listToDisplayed?.map((list) => (
                    <tr key={list.id}>
                      <td className="capitalize ">
                        <Link
                          to={`/list-details/${list.id}`}
                          className="flex gap-1"
                        >
                          {list.name}
                          {list.publish ? (
                            <img
                              src={publishICO}
                              alt="icon de publication"
                              className="w-3 h-3"
                            />
                          ) : (
                            // <Wifi color="black" size={15}  />
                            ""
                          )}
                        </Link>{" "}
                      </td>
                      <td>{formatDate(list.createdAt)} </td>
                      <td>
                        {width >= 610 ? (
                          <div className="flex gap-4 items-center">
                            {user?.role === "ceo" && (
                              <button
                                className="cursor-pointer hover:scale-105 transition-transform duration-300 "
                                onClick={() => handleUpdate(list.id)}
                              >
                                <Pen color="black" size={15} className="" />
                              </button>
                            )}
                            {user?.role === "ceo" && (
                              <button
                                className="cursor-pointer hover:scale-105 transition-transform duration-300 "
                                onClick={() => handleDelete(list.id)}
                              >
                                <Trash color="black" size={15} />
                              </button>
                            )}
                            <button
                              className="cursor-pointer hover:scale-105 transition-transform duration-300 "
                              onClick={() =>
                                handleArchived(list.id, !list.archived)
                              }
                            >
                              {!list.archived ? "Archiver" : "Désarchiver"}{" "}
                            </button>
                            <button
                              className="cursor-pointer hover:scale-105 transition-transform duration-300 border-2 p-1 rounded-lg bg-gray-500 text-white "
                              onClick={() =>
                                handlePublish(list.id, !list.publish)
                              }
                            >
                              {!list.publish ? "publier" : "dissimuler"}{" "}
                            </button>
                          </div>
                        ) : (
                          <div className="dropdown dropdown-center flex justify-start">
                            <div
                              tabIndex={0}
                              role="button"
                              className="btn m-1 text-2xl"
                            >
                              ...
                            </div>
                            <div
                              tabIndex="-1"
                              className="dropdown-content  bg-base-400 back rounded-box z-1 w-40 p-2 mr-10 shadow-sm flex gap-4 items-center  backdrop-blur-lg p-1"
                            >
                              <button
                                className="cursor-pointer hover:scale-105 transition-transform duration-300 "
                                onClick={() => handleUpdate(list.id)}
                              >
                                <Pen color="black" className="" />
                              </button>
                              <button
                                className="cursor-pointer hover:scale-105 transition-transform duration-300 "
                                onClick={() => handleDelete(list.id)}
                              >
                                <Trash color="black" />
                              </button>
                              <button
                                className="cursor-pointer hover:scale-105 transition-transform duration-300 "
                                onClick={() =>
                                  handleArchived(list.id, !list.archived)
                                }
                              >
                                {!list.archived ? (
                                  <Archive color="black" />
                                ) : (
                                  <img
                                    src={unArchive}
                                    className="w-60 h-auto"
                                  />
                                )}{" "}
                              </button>
                              <button
                                className="cursor-pointer hover:scale-205 transition-transform duration-300 border-2 p-1 rounded-lg bg-gray-500 text-white "
                                onClick={() =>
                                  handlePublish(list.id, !list.publish)
                                }
                              >
                                {!list.publish ? (
                                  <img
                                    src={publishICO}
                                    className="w-30 h-auto"
                                  />
                                ) : (
                                  <img src={wifiOff} className="w-30 h-auto" />
                                )}
                              </button>
                            </div>
                          </div>
                        )}
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
