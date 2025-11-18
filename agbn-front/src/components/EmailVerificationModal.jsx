import React from "react";
import { doLogout, verificationEmailByUser } from "../../utils/authFetcher";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import useClientStore from "../../store/clientStore";
import useAuthStore from "../../store/useAuthStore";
import { Btn } from "./Button";

export default function EmailVerificationModal() {
  const { user, logout } = useAuthStore();
  const { remove } = useClientStore();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: verificationEmailByUser,
  });

  const handleEmailVerying = async (data) => {
    const resp = confirm(
      " vous allez etre deconnecter pour la validation de votre email "
    );
    if (!resp) return;

    try {
      await mutateAsync({ userId: user.id, email: data.email });

      await doLogout();
      logout();
      remove();
      setTimeout(() => {
        logout();
        remove();
        navigate("/success-register", { replace: true });
      }, 1000);
    } catch (error) {
      console.log(error.toString().split(": ")[1]);
      toast.error(`${error}`);
    }
  };
  return (
    <dialog id="my_modal_3" className="modal">
      <div className="modal-box">
        <form method="dialog" onSubmit={handleSubmit(handleEmailVerying)}>
          {/* if there is a button in form, it will close the modal */}
          <button
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            onClick={() => !document.getElementById("my_modal_3").close()}
          >
            ✕
          </button>
          <label htmlFor="email">Votre email</label>
          <input
            className="input input-neutral ml-4"
            placeholder="email"
            {...register("email", {
              required: "L'email est requis",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Email invalide",
              },
            })}
          />
          {errors.email && (
            <p style={{ color: "red" }}>{errors.email.message}</p>
          )}
          <Btn
            title="Verifier"
            position=" self-end mt-5 "
            weight=" px-5"
            fontStyle=" font-bold text-xl  text-gray-700"
            attributes="submit"
            disable={isPending && true}
          />
        </form>
      </div>
    </dialog>
  );
}
