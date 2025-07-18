import { Link } from "react-router-dom";
import { TypeAnimation } from "react-type-animation";
import NavBar from "../components/NavBar";
import useAuthStore from "../../store/useAuth";
import { ThreeDot } from "react-loading-indicators";
import { useState, useEffect } from "react";

export function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const { isAuthenticated } = useAuthStore();

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
          sequence={["Bienvenue sur \n\n AGBAN", 2000]}
          className={
            "  text-2xl text-center mb-20 font-roboto font-bold text-gray-600  md:max-2xl:text-4xl"
          }
          speed={50}
          repeat={Infinity}
          cursor={false}
        />
        {isAuthenticated ? (
          <Link
            className={
              "bg-gray-600 p-3 rounded-lg opacity-80 text-white font-center  hover:scale-110  "
            }
            to={"/add-client"}
          >
            Ajouter un client
          </Link>
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
      </div>
    </>
  );
}
