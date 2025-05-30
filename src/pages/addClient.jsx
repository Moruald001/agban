// @ts-nocheck
import { useForm } from "react-hook-form";
import { Btn } from "../components/button";
import { useEffect, useState } from "react";

export function AddClient() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const images = watch("images");
  // console.log(images);
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    if (images && images[0]) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(images[0]);
    } else {
      setPreview(null);
    }
  }, [images]);

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-3 items-center relative bottom-10 -right-2 justify-center min-h-screen mx-4  "
    >
      {/* client name */}
      <label className="text-xl  font-bold font-roboto" htmlFor="name">
        Nom du client
      </label>

      <input
        className=" text-center focus:outline-hidden border-1 border-solid rounded-[0.6em] border-gray-400 p-2 min-w-3xs"
        type="text"
        id="name"
        placeholder="Nom du client"
        {...register("name", {
          required: true,
          minLength: 2,
          pattern: /^[A-Za_z ]+$/i,
        })}
      />
      {errors.name && (
        <p className="text-white bg-red-400 px-4 py-2 ml-1 rounded-md border-1 border-white after:content-['⚠️']">
          Nom invalide
        </p>
      )}
      {/* contact */}

      <label className="text-xl font-bold font-exo" htmlFor="contact">
        Contact du client
      </label>
      <input
        className="border-1 border-solid rounded-[0.6em] border-gray-400 p-2 min-w-3xs text-center focus:outline-hidden "
        type="text"
        // name="contact"
        id="contact"
        placeholder="+228 90270099"
        {...register("contact", {
          required: true,
          minLength: 8,
          pattern: /^[0-9+ ]+$/,
        })}
      />
      {errors.contact && (
        <p className="text-white bg-red-400 px-4 py-2 ml-1 rounded-md border-1 border-white after:content-['⚠️']">
          Contact invalide
        </p>
      )}

      {/* textarea */}
      <label className="text-xl font-bold font-exo " htmlFor="description">
        Description des colis{" "}
      </label>
      <textarea
        className="border-1 border-solid rounded-[0.6em] text-center focus:outline-hidden border-gray-400 p-2 resize-none min-w-3xs min-h-4"
        id="description"
        placeholder="ex:  1 tonneau "
        {...register("description", {
          required: true,
          pattern: /^[A-Za-z0-9\s]+$/,
        })}
      ></textarea>
      {errors.description && (
        <p className="text-white bg-red-400 px-4 py-2 ml-1 rounded-md border-1 border-white after:content-['⚠️']">
          {" "}
          description est importante
        </p>
      )}

      {/* image colis */}

      <label className="text-xl font-bold font-exo " htmlFor="image">
        Photos des colis
      </label>
      <input
        className="border-1 border-solid rounded-[0.6em] border-gray-400 py-2 text-center hover:bg-gray-600 hover:text-white cursor-pointer ease-in duration-200 pl-4 min-w-[17em]"
        type="file"
        multiple
        {...register("images", {
          required: "Au moins une image est requis",
          validate: {
            maxFiles: (images) => images.length <= 5 || "Maximum 5 fichiers",
            lessThan10MBPerFile: (images) =>
              Array.from(images).every((image) => image.size < 10000000) ||
              "Chaque fichier doit faire moins de 10MB",
            acceptedFormats: (images) =>
              Array.from(images).every((image) =>
                ["image/jpeg", "image/png"].includes(image.type)
              ) || "Seuls JPEG, PNG  sont acceptés",
          },
        })}
      />
      {errors.images && (
        <p className="text-white bg-red-400 px-4 py-2 ml-1 rounded-md border-1 border-white after:content-['⚠️']">
          {errors.images.message}
        </p>
      )}
      {preview && (
        <div style={{ marginTop: "1rem" }}>
          <h3>Aperçu :</h3>
          <img
            src={preview}
            alt="Preview"
            style={{
              maxWidth: "30px",
              maxHeight: "30px",
              border: "1px solid #ddd",
              borderRadius: "4px",
            }}
          />
        </div>
      )}
      {/* select */}

      <label className="text-xl font-bold font-exo mb-2" htmlFor="status">
        Status du colis
      </label>
      <select
        className="self-center cursor-pointer  bg-gray-600 text-white p-2 rounded-[0.6em] focus:bg-gray-300 focus:text-black duration-10 ease-in-out"
        {...register("status", { required: true })}
        defaultValue="keep"
      >
        <option value="release">Liberer </option>
        <option value="keep">Garder</option>
      </select>
      <Btn
        title="Creer"
        position=" self-center mt-10 "
        weight=" px-14"
        fontStyle=" font-bold text-xl"
        attributes="submit"
      />
    </form>
  );
}
