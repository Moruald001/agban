// @ts-nocheck
import { useForm } from "react-hook-form";
import { Btn } from "../components/button";
import { useEffect, useState } from "react";
import { ThreeDot } from "react-loading-indicators";

export function AddClient() {
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const images = watch("images");
  // console.log(images);
  const [preview, setPreview] = useState([]);

  useEffect(() => {
    const imagesUrlArray = [];

    if (images && images.length > 0) {
      Array.from(images).forEach((image) => {
        const imageUrl = URL.createObjectURL(image);
        imagesUrlArray.push(imageUrl);
        setPreview(imagesUrlArray);

        return () => {
          //nettoyage
          imagesUrlArray.forEach((url) => URL.revokeObjectURL(url));
        };
      });
    } else {
      setPreview(null);
    }
  }, [images]);
  // handle loading
  const statusLoading = async (value) => {
    await setIsLoading(value);
  };
  useEffect(() => {
    statusLoading(true);

    const timeOut = setTimeout(() => {
      statusLoading(false);
    }, 1000);

    return () => {
      clearTimeout(timeOut);
    };
  }, []);
  //creation d un tableau pour limiter les previews

  const previewLimited = preview?.filter((_, index) => index < 5);

  const onSubmit = (data) => {
    console.log(data);
  };

  return isLoading ? (
    <div className="flex justify-center items-center mt-100">
      <ThreeDot
        variant="bounce"
        color="#a9a9a9"
        size="medium"
        text=""
        textColor=""
      />
    </div>
  ) : (
    <div className="  ">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-3 items-center justify-center min-h-64 relative bottom-10 -
         mx-4 mt-5 md:max-lg:scale-130  lg:max-2xl:scale-180  p-3 backdrop-blur-3xl border-1 border-transparent shadow-gray-600/50 -right-2 ring-2 ring-yellow-100/40 shadow-2xl rounded-2xl"
      >
        {/* client name */}
        <label
          className="text-xl  text-gray-700  font-bold font-roboto"
          htmlFor="name"
        >
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
          <p className="text-red-400  after:content-['⚠️']">Nom invalide</p>
        )}
        {/* contact */}

        <label
          className="text-xl  text-gray-700 font-bold font-exo"
          htmlFor="contact"
        >
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
          <p className="text-red-400  after:content-['⚠️']">Contact invalide</p>
        )}

        {/* textarea */}
        <label
          className="text-xl  text-gray-700 font-bold font-exo "
          htmlFor="description"
        >
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
          <p className="text-red-400  after:content-['⚠️']">
            {" "}
            description est importante
          </p>
        )}

        {/* image colis */}

        <label
          className="text-xl  text-gray-700 font-bold font-exo "
          htmlFor="image"
        >
          Photos des colis
        </label>
        <input
          className="border-1 border-solid rounded-[0.6em] border-gray-400 py-2 text-center hover:bg-gray-600 hover:text-white cursor-pointer ease-in duration-200 pl-4 min-w-[17em]"
          type="file"
          multiple
          {...register("images", {
            required: "Au moins une image est requis",
            validate: {
              maxFiles: (images) =>
                images.length <= 10 || "Maximum 10 fichiers",
              lessThan5MBPerFile: (images) =>
                Array.from(images).every((image) => image.size < 6000000) ||
                "Chaque fichier doit faire moins de 5MB",
              acceptedFormats: (images) =>
                Array.from(images).every((image) =>
                  ["image/jpeg", "image/png"].includes(image.type)
                ) || "Seuls JPEG, PNG  sont acceptés",
            },
          })}
        />
        {errors.images && (
          <p className="text-red-400  after:content-['⚠️']">
            {errors.images.message}
          </p>
        )}

        {/* apercu */}
        {previewLimited && previewLimited.length > 0 && (
          <div className="flex flex-col  items-center">
            {/* <h1 className="">Images selectionnées</h1> */}
            <div className="flex items-center gap-5 border-1 rounded-xl px-4 border-green-100">
              {previewLimited.map((previewLimitedItem, index) => (
                <div key={index} className="h-10 w-10 my-2">
                  <img
                    className="h-10 w-10 "
                    src={previewLimitedItem}
                    alt={`Preview ${index}`}
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* select */}

        <label
          className="text-xl  text-gray-700 font-bold font-exo mb-2"
          htmlFor="status"
        >
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
          fontStyle=" font-bold text-xl  text-gray-700"
          attributes="submit"
        />
      </form>
    </div>
  );
}
