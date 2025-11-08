import { Link } from "react-router-dom";
import { TypeAnimation } from "react-type-animation";
import NavBar from "../components/NavBar";
import useAuthStore from "../../store/useAuthStore";
import { ThreeDot } from "react-loading-indicators";
import { useState, useEffect } from "react";
import { CreateListModal } from "../components/CreateListModal";
import { Btn } from "../components/Button";
import { Button } from "@headlessui/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { deleteList, getListLatest } from "../../utils/otherFetcher";
import { SyncLoader } from "react-spinners";
import toast from "react-hot-toast";
import { Trash } from "lucide-react";
import { Pen } from "lucide-react";
import useClientStore from "../../store/clientStore";

export function Home() {
  const [showModal, setShowModal] = useState(false);
  const [listId, setListId] = useState(null);
  const [modalType, setModaltype] = useState("createList");
  const { latestList, createLatestList } = useClientStore();

  const [Loading, setLoading] = useState(false);
  const { isAuthenticated, user } = useAuthStore();

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["latest_lists", user?.id],
    queryFn: ({ queryKey }) => getListLatest(queryKey[1]),
    enabled: isAuthenticated === true && !!user?.id,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    createLatestList(data?.lists);
  }, [data]);

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
      refetch();
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
          <div className="flex gap-x-4">
            <Link
              className={
                "bg-transparent  p-3 rounded-lg opacity-80 text-black font-center border-2  hover:scale-110  transition-all duration-300 "
              }
              to={"/login"}
            >
              Se connecter
            </Link>
            <Link
              className={
                "bg-gray-600 p-3 rounded-lg opacity-80 text-white font-center  hover:scale-110 transition-all duration-300  "
              }
              to={"/register"}
            >
              Créer un compte
            </Link>
          </div>
        )}
        <CreateListModal
          listId={listId}
          modalType={modalType}
          showModal={showModal}
          location="home"
          onClose={() => {
            setShowModal(false);
          }}
        />

        {isAuthenticated && !isLoading ? (
          <div className=" min-w-[60vw] max-w-[80vw] h-auto mt-10  rounded-box">
            <p className="pl-2">Dernières listes crées</p>
            <hr className="border-b-2 mt-2 opacity-30" />
            <div className="flex flex-col gap-2 justify-evenly mt-5">
              <ul className="  bg-gray-200/69 rounded-box shadow-md ">
                {latestList?.length > 0 ? (
                  latestList.map((list) => (
                    <li
                      key={list.id}
                      className="list-row p-4 my-4 gap-2 transition-colors duration-300 hover:bg-slate-600/15  "
                    >
                      <div className="flex  justify-between gap-4">
                        <p className="capitalize">
                          <Link key={list.id} to={`/list-details/${list.id}`}>
                            {list.name}
                          </Link>
                        </p>
                        <div className="flex gap-8">
                          <button
                            className="cursor-pointer hover:scale-105 transition-transform duration-300 "
                            onClick={() => {
                              setModaltype("updateList"), handleUpdate(list.id);
                            }}
                          >
                            <Pen color="black" size={20} />
                          </button>
                          <button
                            className="cursor-pointer hover:scale-105 transition-transform duration-300"
                            onClick={() => {
                              handleDelete(list.id);
                            }}
                          >
                            <Trash color="black" size={20} />
                          </button>
                        </div>
                      </div>
                    </li>
                  ))
                ) : (
                  <p className="p-4 text-center text-gray-400">
                    Aucune liste pour le moment
                  </p>
                )}
              </ul>
            </div>
          </div>
        ) : (
          <div className="w-screen h-screen flex justify-center items-end ">
            <SyncLoader color="grey" />
          </div>
        )}
      </div>
    </>
  );
}
