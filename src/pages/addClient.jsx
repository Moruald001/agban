import { useForm } from "react-hook-form";
import { Btn } from "../components/button";

export function AddClient() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-3 items-start relative bottom-20 -right-2 justify-center min-h-screen mx-4"
    >
      <label className="text-xl font-bold font-roboto" htmlFor="name">
        Nom du client
      </label>

      <input
        className="border-1 border-solid rounded-[0.6em] border-gray-400 p-2 "
        type="text"
        id="name"
        required
        placeholder="Nom du client"
        {...register("name", {
          required: true,
          minLength: 2,
          pattern: /^[A-Za_z]+$/i,
        })}
      />
      {errors.name && <p>Nom invalide</p>}
      <label className="text-xl font-bold font-exo" htmlFor="contact">
        Contact du client
      </label>
      <input
        className="border-1 border-solid rounded-[0.6em] border-gray-400 p-2 "
        type="text"
        // name="contact"
        id="contact"
        required
        placeholder="+"
        {...register("contact", {
          required: true,
          minLength: 8,
          pattern: /^[0-9]+$/,
        })}
      />
      {errors.contact && <p>Contact invalide</p>}
      <label className="text-xl font-bold font-roboto " htmlFor="description">
        Description des colis{" "}
      </label>
      <textarea
        className="border-1 border-solid rounded-[0.6em] focus:outline-hidden border-gray-400 p-2 resize-none min-w-3xs min-h-4"
        name="description"
        id="description"
      ></textarea>
      <label className="text-xl font-bold font-exo mb-2" htmlFor="status">
        Status du colis
      </label>
      <select
        className="self-center cursor-pointer"
        {...register("status", { required: true })}
      >
        <option value="release">Liberer </option>
        <option value="keep">Garder</option>
      </select>
      <Btn
        title="Creer"
        position=" self-center mt-10 "
        weight=" px-14"
        fontStyle=" font-bold text-xl"
      />
    </form>
  );
}
