import { Btn } from "../components/button";
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
      <Btn title="Ajouter un client" animation="animate-bounce" />
    </div>
  );
}
