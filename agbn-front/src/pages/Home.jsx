import { Link } from "react-router-dom";
import { TypeAnimation } from "react-type-animation";
import NavBar from "../components/NavBar";
import useAuthStore from "../../store/useAuthStore";
import { ThreeDot } from "react-loading-indicators";
import { useState, useEffect } from "react";
import { Modal } from "../components/modal";
import { Btn } from "../components/button";
import { Button } from "@headlessui/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { deleteList, getListLatest } from "../../utils/otherFetcher";
import { SyncLoader } from "react-spinners";
import toast from "react-hot-toast";
import { Trash } from "lucide-react";
import { Pen } from "lucide-react";

export function Home() {
  const [showModal, setShowModal] = useState(false);
  const [listId, setListId] = useState(null);
  const [modalType, setModaltype] = useState("createList");

  const [Loading, setLoading] = useState(false);
  const { isAuthenticated, user } = useAuthStore();

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["latest_lists"],
    queryFn: getListLatest,
    enabled: isAuthenticated === true ? true : false,
    refetchOnWindowFocus: false,
  });

  const { mutateAsync } = useMutation({
    mutationFn: deleteList,
  });

  const handleUpdate = async (id) => {
    await setListId(id);
    await setShowModal(true);
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

  if (error) {
    toast.error(error.message);
  }

  const statusLoading = async (value) => {
    await setLoading(value);
  };

  useEffect(() => {
    statusLoading(true);

    const timeOut = setTimeout(() => {
      statusLoading(false);
    }, 1000);

    return () => {
      clearTimeout(timeOut);
    };
  }, []);

  return Loading ? (
    <div className="flex justify-center items-center w-screen h-screen">
      <ThreeDot
        variant="bounce"
        color="#a9a9a9"
        size="medium"
        text=""
        textColor=""
      />
    </div>
  ) : (
    <>
      <NavBar />
      <div className=" mt-50  p-5 flex flex-col justify-start items-center ">
        <TypeAnimation
          sequence={[
            `Bienvenue,  ${
              user && user?.name !== undefined ? user?.name : "sur AGBAN"
            }`,
            2000,
          ]}
          className={
            "  text-3xl text-center mb-20 font-roboto font-bold text-gray-600  md:max-2xl:text-4xl capitalize"
          }
          speed={50}
          repeat={Infinity}
          cursor={false}
        />
        {isAuthenticated ? (
          <div className="flex gap-4">
            <Button
              onClick={() => {
                setShowModal(true);
                setModaltype("createList");
              }}
              className={
                "bg-gray-600 p-3 rounded-lg opacity-80 text-white font-center cursor-pointer hover:scale-110 transition-transform duration-600  "
              }
            >
              Créer une liste
            </Button>
            <Link
              className={
                "bg-gray-600 p-3 rounded-lg opacity-80 text-white font-center  hover:scale-110 transition-transform duration-600  "
              }
              to={`/list`}
            >
              Voir toutes les listes
            </Link>
          </div>
        ) : (
          <Link
            className={
              "bg-gray-600 p-3 rounded-lg opacity-80 text-white font-center  hover:scale-110 capitalize "
            }
            to={"/login"}
          >
            se connecter
          </Link>
        )}
        <Modal
          listId={listId}
          modalType={modalType}
          showModal={showModal}
          onClose={() => {
            setShowModal(false);
          }}
        />

        {isAuthenticated && !isLoading ? (
          <div className=" w-screen  px-15 fle flex-col justify-center items-start mt-10 ">
            <p className="pl-2">Dernières listes crées</p>
            <hr className="border-b-1 mt-2 opacity-30" />
            <div className="flex flex-col gap-2 justify-evenly mt-5">
              <ul className="list bg-gray-200/69 rounded-box shadow-md">
                {data?.lists.map((list) => (
                  <li key={list.id} className="list-row gap-2">
                    <div className="flex  justify-between gap-4">
                      <p className="capitalize">{list.name} </p>
                      <div className="flex gap-2">
                        <button
                          className="cursor-pointer hover:scale-105 transition-transform duration-300 "
                          onClick={() => {
                            setModaltype("updateList"), handleUpdate(list.id);
                          }}
                        >
                          <Pen color="black" size={15} className="" />
                        </button>
                        <button
                          className="cursor-pointer hover:scale-105 transition-transform duration-300"
                          onClick={() => {
                            handleDelete(list.id);
                          }}
                        >
                          <Trash color="black" size={15} />
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ) : (
          <div className="w-screen h-screen flex justify-center items-end ">
            <SyncLoader />
          </div>
        )}
      </div>
    </>
  );
}
