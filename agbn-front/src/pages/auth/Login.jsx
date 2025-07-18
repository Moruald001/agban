import { useForm } from "react-hook-form";
import { Btn } from "../../components/button";
import { schemaLogin } from "../../lib/Schema";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link } from "react-router-dom";
import { doLogin } from "../../../lib/authFetcher";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { Navigate } from "react-router-dom";

export function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schemaLogin),
  });
  const { mutate, isPending, isError, isSuccess, error } = useMutation({
    mutationFn: doLogin,
  });

  const onSubmit = (data) => {
    mutate(data);

    if (isSuccess) {
      toast.success("Connexion reussî");
      setTimeout(() => {
        Navigate("/");
      }, 1000);
    }
    if (isError) {
      console.log(error);
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
        <input
          className={`border-1 border-solid rounded-[0.6em] border-gray-400 p-2 min-w-3xs text-center focus:outline-hidden ${
            errors.password && "border-pink-800"
          }`}
          type="password"
          // name="contact"
          id="password"
          placeholder="mot de passe"
          {...register("password")}
        />
        {errors.password && (
          <p className="text-red-400 text-center  after:content-['⚠️']">
            {errors.password.message}
          </p>
        )}
        <Btn
          title="Se connecter"
          position=" self-center mt-10 "
          weight=" px-5"
          fontStyle=" font-bold text-xl  text-gray-700"
          attributes="submit"
          disable={isPending && "disable"}
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
