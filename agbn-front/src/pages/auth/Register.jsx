import { useForm } from "react-hook-form";
import { Btn } from "../../components/button";
import { yupResolver } from "@hookform/resolvers/yup";
import { schemaRegister } from "../../lib/Schema";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { doRegistration } from "../../../utils/authFetcher";
import { useNavigate, Link } from "react-router-dom";
import useAuthStore from "../../../store/useAuth";

export function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schemaRegister),
  });
  const navigate = useNavigate();
  const { login } = useAuthStore();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: doRegistration,
  });

  const onSubmit = (data) => {
    const shrinkData = {
      name: data.name,
      email: data.email,
      password: data.password,
      role: data.role,
    };

    try {
      const user = mutateAsync(shrinkData);
      login(user);
      toast.success("Inscription réussi");
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      console.log(error);
      toast.error(`${error}`);
    }
  };
  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className=" w-screen h-screen flex flex-col  items-center justify-center 
          "
      >
        <div className=" card  p-20 shadow-[10px_10px_40px_black]/30 flex flex-col  gap-3  ">
          <label
            className="text-xl  text-gray-700 font-bold font-exo"
            htmlFor="nom"
          >
            Nom
          </label>
          <input
            className="border-1 border-solid rounded-[0.6em] border-gray-400 p-2 min-w-3xs text-center focus:outline-hidden "
            type="text"
            // name="contact"
            id="nom"
            placeholder="nom"
            {...register("name")}
          />
          {errors.name && (
            <p className="text-red-400 text-center after:content-['⚠️']">
              {errors.name.message}
            </p>
          )}
          <label
            className="text-xl  text-gray-700 font-bold font-exo"
            htmlFor="email"
          >
            Email
          </label>
          <input
            className="border-1 border-solid rounded-[0.6em] border-gray-400 p-2 min-w-3xs text-center focus:outline-hidden "
            type="text"
            // name="contact"
            id="email"
            placeholder="email"
            {...register("email")}
          />
          {errors.email && (
            <p className="text-red-400 text-center after:content-['⚠️']">
              {errors.email.message}
            </p>
          )}
          <label
            className="text-xl  text-gray-700 font-bold font-exo "
            htmlFor="password"
          >
            Mot de passe
          </label>
          <input
            className="border-1 border-solid rounded-[0.6em] border-gray-400 p-2 min-w-3xs text-center focus:outline-hidden "
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
          <label
            className="text-xl  text-gray-700 font-bold font-exo"
            htmlFor="confirmPassword"
          >
            Confirmer le mot de passe
          </label>
          <input
            className="border-1 border-solid rounded-[0.6em] border-gray-400 p-2 min-w-3xs text-center focus:outline-hidden "
            type="password"
            // name="contact"
            id="confirmPassword"
            placeholder="mot de passe"
            {...register("confirmPassword")}
          />
          {errors.confirmPassword && (
            <p className="text-red-400 text-center  after:content-['⚠️']">
              {errors.confirmPassword.message}
            </p>
          )}

          <p className="text-left text-xl font-bold ml-1 my-2">
            Choisir un rôle
          </p>
          <div className="flex justify-evenly gap-12  ">
            <div className="flex flex-col-reverse capitalize">
              <label className="mt-2" htmlFor="role">
                ceo
              </label>
              <input
                className="  border-gray-400/20 bg-gray-400 p-2  text-center scale-130 "
                type="radio"
                value="ceo"
                id="role"
                {...register("role")}
              />
            </div>
            <div className="flex flex-col-reverse capitalize">
              <label className="mt-2" htmlFor="role">
                collaborateur
              </label>

              <input
                className=" border-gray-400  text-center scale-130 "
                type="radio"
                id="role"
                value="collaborateur"
                {...register("role")}
              />
            </div>
          </div>
          {errors.role && (
            <p className="text-red-400 text-center  after:content-['⚠️']">
              {errors.role.message}
            </p>
          )}
          <Btn
            title="S'inscrire"
            position=" self-center mt-10 "
            weight=" px-14"
            fontStyle=" font-bold text-xl  text-gray-700"
            attributes="submit"
            disable={isPending ? "disabled:bg-gray-400" : ""}
          />
          <p className=" text-sm mt-2 text-center">
            Vous avez déjà un compte?{" "}
            <Link className="text-blue-600 underline" to={"/login"}>
              Se connecter
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}
