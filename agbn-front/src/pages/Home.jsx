import { Link } from "react-router-dom";
import { TypeAnimation } from "react-type-animation";
import NavBar from "../components/NavBar";
import useAuthStore from "../../store/useAuth";
import { ThreeDot } from "react-loading-indicators";
import { useState, useEffect } from "react";
import { Modal } from "../components/modal";
import { Btn } from "../components/button";
import { Button } from "@headlessui/react";
import { useQuery } from "@tanstack/react-query";
import { getListLatest } from "../../utils/otherFetcher";
import { SyncLoader } from "react-spinners";
// import Card from "../components/Card"

export function Home() {
  const [showModal, setShowModal] = useState(false);

  const [Loading, setLoading] = useState(false);
  const { isAuthenticated, user } = useAuthStore();

  const { data, isLoading, error } = useQuery({
    queryKey: ["lists"],
    queryFn: getListLatest,
  });

  console.log(data?.lists);
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
                    <div>
                      <p className="capitalize">{list.name} </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ) : (
          <SyncLoader />
        )}
      </div>
    </>
  );
}
