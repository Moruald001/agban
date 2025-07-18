import { Link } from "react-router-dom";
import { TypeAnimation } from "react-type-animation";
import NavBar from "../components/NavBar";

export function Home() {
  return (
    <>
      <NavBar />
      <div className="    p-5 flex flex-col justify-start items-center md:max-2xl:text-3x mt-40">
        <TypeAnimation
          sequence={["Bienvenue sur \n\n AGBAN", 2000]}
          className={
            "  text-2xl text-center mb-20 font-roboto font-bold text-gray-600  md:max-2xl:text-4xl"
          }
          speed={50}
          repeat={Infinity}
          cursor={false}
        />
        <Link
          className={
            "bg-gray-600 p-3 rounded-lg opacity-80 text-white font-center  hover:scale-110  "
          }
          to={"/add-client"}
        >
          Ajouter un client
        </Link>
      </div>
    </>
  );
}
