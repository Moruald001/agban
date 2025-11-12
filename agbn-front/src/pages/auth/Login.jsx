import { useForm } from "react-hook-form";
import { Btn } from "../../components/Button";
import { schemaLogin } from "../../lib/Schema";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link } from "react-router-dom";
import { doLogin } from "../../../utils/authFetcher";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../../../store/useAuthStore";
import { useState } from "react";
import oeilFermé from "../../assets/oeilFermé.png";
import oeilOuvert from "../../assets/oeilOuvert.png";

export function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schemaLogin) });
  const navigate = useNavigate();
  const { login } = useAuthStore();
  const [togglePassword, setTogglePassword] = useState("password");

  const toggleInput = () => {
    togglePassword === "password"
      ? setTogglePassword("text")
      : setTogglePassword("password");
  };
  const { mutateAsync, isPending } = useMutation({
    mutationFn: doLogin,
  });

  const onSubmit = async (data) => {
    try {
      const user = await mutateAsync(data);

      toast.success("Connexion réussi");
      await login(user.user);
      setTimeout(() => {
        navigate("/", { replace: true });
      }, 1000);
    } catch (error) {
      console.log(error.toString().split(": ")[1]);
      toast.error(`${error}`);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-screen h-screen flex flex-col  items-center justify-center  m-auto "
    >
      <div className="card  p-10 shadow-[10px_10px_40px_black]/30 flex flex-col  gap-3 ">
        <label className="text-xl   text-gray-700 font-bold " htmlFor="email">
          Email
        </label>
        <input
          className={`border-1 border-solid rounded-[0.6em] border-gray-400 p-2 min-w-3xs text-center focus:outline-hidden   ${
            errors.email && "border-pink-800"
          } 
        }`}
          type="text"
          // name="contact"
          id="email"
          placeholder="example@email.com"
          {...register("email")}
        />
        {errors.email && (
          <p className="text-red-400 text-center  after:content-['⚠️']">
            {errors.email.message}
          </p>
        )}
        <label
          className="text-xl  text-gray-700 font-bold font-exo"
          htmlFor="password"
        >
          Mot de passe
        </label>
        <div className="flex flex-row gap-3">
          <input
            className="border-1 border-solid rounded-[0.6em] border-gray-400 p-2 min-w-3xs text-center focus:outline-hidden "
            type={togglePassword}
            // name="contact"
            id="password"
            placeholder="mot de passe"
            {...register("password")}
          />
          <button
            type="button"
            onClick={toggleInput}
            className="cursor-pointer"
          >
            <img
              className="w-7 h-7 "
              src={togglePassword === "password" ? oeilFermé : oeilOuvert}
              alt=""
            />
          </button>
        </div>
        {errors.password && (
          <p className="text-red-400 text-center  after:content-['⚠️']">
            {errors.password.message}
          </p>
        )}
        <Btn
          title={isPending ? "connexion.." : "Se connecter"}
          position=" self-center mt-10 "
          weight=" px-5"
          fontStyle=" font-bold text-xl  text-gray-700"
          attributes="submit"
          disable={isPending && true}
        />{" "}
        <p className=" text-sm">
          Vous n'avez pas de compte?{" "}
          <Link className="text-blue-600 underline" to={"/register"}>
            Créer un compte
          </Link>
        </p>
      </div>
    </form>
  );
}
