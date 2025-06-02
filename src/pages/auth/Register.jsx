import { useForm } from "react-hook-form";
import { Btn } from "../../components/button";
import { yupResolver } from "@hookform/resolvers/yup";
import { schemaRegister } from "../../lib/Schema";

export function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schemaRegister),
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-3 items-center justify-center min-h-70 max-w-3xl relative bottom-10 -
         mx-4 mt-5  md:max-xl:scale-170  xl:max-3xl:scale-200  p-3 backdrop-blur-3xl border-1 border-transparent shadow-gray-600/50 -right-2 ring-2 ring-yellow-100/40 shadow-2xl rounded-2xl"
      >
        <label
          className="text-xl  text-gray-700 font-bold font-exo"
          htmlFor="pseudo"
        >
          Pseudo
        </label>
        <input
          className="border-1 border-solid rounded-[0.6em] border-gray-400 p-2 min-w-3xs text-center focus:outline-hidden "
          type="text"
          // name="contact"
          id="pseudo"
          placeholder="Pseudo"
          {...register("pseudo")}
        />
        {errors.pseudo && (
          <p className="text-red-400 text-center w-50 after:content-['⚠️']">
            {errors.pseudo.message}
          </p>
        )}

        <label
          className="text-xl  text-gray-700 font-bold font-exo"
          htmlFor="password"
        >
          mot de passe
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
          <p className="text-red-400 text-center w-50 after:content-['⚠️']">
            {errors.password.message}
          </p>
        )}

        <label
          className="text-xl  text-gray-700 font-bold font-exo"
          htmlFor="confirmePassword"
        >
          Confirmer le mot de passe
        </label>
        <input
          className="border-1 border-solid rounded-[0.6em] border-gray-400 p-2 min-w-3xs text-center focus:outline-hidden "
          type="password"
          // name="contact"
          id="confirmPassword"
          placeholder="mot de passe"
          {...register("confirmePassword")}
        />
        {errors.confirmePassword && (
          <p className="text-red-400 text-center w-50 after:content-['⚠️']">
            {errors.confirmePassword.message}
          </p>
        )}
        <Btn
          title="S'inscrire"
          position=" self-center mt-10 "
          weight=" px-14"
          fontStyle=" font-bold text-xl  text-gray-700"
          attributes="submit"
        />
      </form>
    </div>
  );
}
