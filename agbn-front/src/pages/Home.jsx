import { Link } from "react-router-dom";
import { TypeAnimation } from "react-type-animation";
import NavBar from "../components/NavBar";
import useAuthStore from "../../store/useAuth";
import { ThreeDot } from "react-loading-indicators";
import { useState, useEffect } from "react";

export function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const { isAuthenticated, user } = useAuthStore();

  const statusLoading = async (value) => {
    await setIsLoading(value);
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

  return isLoading ? (
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
            <Link
              className={
                "bg-gray-600 p-3 rounded-lg opacity-80 text-white font-center  hover:scale-110 transition-transform duration-600  "
              }
              to={"/create-list"}
            >
              Créer une liste
            </Link>
            <Link
              className={
                "bg-gray-600 p-3 rounded-lg opacity-80 text-white font-center  hover:scale-110 transition-transform duration-600  "
              }
              to={"/list"}
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

        {isAuthenticated && (
          <div className=" w-screen  px-15 fle flex-col justify-center items-start mt-10">
            <p>Dernières listes crées</p>
            <hr className="border-b-1 mt-2 opacity-30" />
            <div className="flex flex-col"></div>
          </div>
        )}
      </div>
    </>
  );
}
