import { Link } from "react-router-dom";
import { TypeAnimation } from "react-type-animation";

export function Home() {
  return (
    <div className=" relative top-36 flex flex-col justify-center items-center">
      <TypeAnimation
        sequence={["Bienvenue sur le Gestionnaire de Chargement ", 2000]}
        className={
          "text-lg text-center mb-20 font-roboto font-bold text-gray-600 after:content-['🚚']"
        }
        speed={50}
        repeat={Infinity}
        cursor={false}
      />
      <Link
        className={
          "bg-gray-600 p-3 rounded-3xl text-white font-center font-exo  duration-300 ease-in-out hover:scale-75 transition-transform animate-bounce "
        }
        to={"/add-client"}
      >
        Ajouter un client
      </Link>
    </div>
  );
}
