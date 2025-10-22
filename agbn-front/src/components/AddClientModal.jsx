// @ts-nocheck
import { useForm } from "react-hook-form";
import { Btn } from "./button";
import { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogPanel,
  DialogTitle,
  DialogBackdrop,
} from "@headlessui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { createClientSchema } from "../lib/Schema";
import { useMutation, useQuery } from "@tanstack/react-query";
import { createClient, getList, updateClient } from "../../utils/otherFetcher";
import toast from "react-hot-toast";
import useAuthStore from "../../store/useAuthStore";
import useClientStore from "../../store/clientStore";

export function AddClientModal({
  showModal,
  onClose,
  listId,
  modalType,
  clientId,
}) {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      contact: "",
      description: "",
      keep: false,
    },
    resolver: yupResolver(createClientSchema),
  });

  const { isAuthenticated } = useAuthStore();
  const { create } = useClientStore();
  const { lists } = useClientStore();

  const { data, refetch } = useQuery({
    queryKey: ["lists"],
    queryFn: getList,
    enabled: isAuthenticated === true ? true : false,
    refetchOnWindowFocus: isAuthenticated === true ? true : false,
  });

  const listSelected = lists?.find((item) => item.id === listId);
  const clientSelected = listSelected?.clients?.find(
    (item) => item.id === clientId
  );
  useEffect(() => {
    if (modalType !== "createClient" && clientSelected) {
      reset({
        name: clientSelected.name,
        description: clientSelected.description,
        contact: clientSelected.contact,
        keep: clientSelected.keep,
      });
    } else {
      reset({ name: "", contact: "", description: "", keep: false });
    }
  }, [clientSelected, modalType, reset]);

  const { mutateAsync, isPending } = useMutation({
    mutationFn: modalType === "createClient" ? createClient : updateClient,
  });

  const images = watch("images");

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

  //creation d un tableau pour limiter les previews

  const previewLimited = preview?.filter((_, index) => index < 5);

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("contact", data.contact);
    formData.append("description", data.description);
    formData.append("keep", data.keep);
    formData.append("listId", listId);

    Array.from(data.images).forEach((image) => {
      formData.append("images", image);
    });

    try {
      await mutateAsync(
        formData,
        modalType === "createClient" ? null : clientId
      );

      await refetch();
      await toast.success(`client ${data.name} ajouté`);

      setTimeout(() => {
        const res = confirm("voulez vous ajouter un autre client?");
        if (!res) {
          reset();
          onClose();
        }
      }, 2000);
    } catch (error) {
      console.log(error.toString().split(": ")[1]);
      toast.error(error.message || "Erreur lors de l'ajout");
    }
  };
  useEffect(() => {
    create(data);
  }, []);

  return (
    <Dialog
      open={showModal}
      as="div"
      className="relative z-10 "
      onClose={onClose}
    >
      <DialogBackdrop className="fixed inset-0 bg-black/30 " />
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <DialogPanel
            transition
            className="w-full max-w-md rounded-xl border-1 border-slate-200  shadow-[10px_10px_40px_black]/30  bg-white p-6  duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0"
          >
            <DialogTitle
              as="h3"
              className=" text-center mb-4 font-bold text-gray-700 text-2xl"
            >
              {modalType === "createClient"
                ? "Ajout d'un client"
                : "Modifier un client"}
            </DialogTitle>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col mt-3"
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
                placeholder={
                  modalType === "createClient"
                    ? "Nom du client"
                    : clientSelected?.name
                }
                {...register("name")}
              />
              {errors.name && (
                <p className="text-red-400  after:content-['⚠️']">
                  {errors.name.message}
                </p>
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
                placeholder={
                  modalType === "createClient"
                    ? "ex :+228902334534/+22891870964"
                    : clientSelected?.contact
                }
                {...register("contact")}
              />
              {errors.contact && (
                <p className="text-red-400  after:content-['⚠️']">
                  {errors.contact.message}
                </p>
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
                placeholder={
                  modalType === "createClient"
                    ? "1 tonneau"
                    : clientSelected?.description
                }
                {...register("description")}
              ></textarea>
              {errors.description && (
                <p className="text-red-400  after:content-['⚠️']">
                  {" "}
                  {errors.description.message}
                </p>
              )}

              {/* image colis */}

              <label
                className="text-xl  text-gray-700 font-bold font-exo "
                htmlFor="images"
              >
                Photos des colis
              </label>
              <input
                className="border-1 border-solid rounded-[0.6em] border-gray-400 py-2 text-center hover:bg-gray-600 hover:text-white cursor-pointer ease-in duration-200 pl-4 min-w-[17em]"
                type="file"
                id="images"
                accept="image/jpeg, image/png"
                multiple
                {...register("images")}
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
                {...register("keep")}
                defaultValue={
                  modalType === "updateCLient" ? clientSelected?.keep : "true"
                }
              >
                <option value={false}>Libérer </option>
                <option value={true}>Garder</option>
              </select>
              <div className="mt-4 flex justify-between">
                <Button
                  className="inline-flex items-center gap-2 rounded-md bg-gray-300 px-3 py-1.5 text-sm/6 font-semibold text-black shadow-inner shadow-white/10 focus:not-data-focus:outline-none data-focus:outline data-focus:outline-white data-hover:bg-gray-600 data-open:bg-gray-700 transition-colors duration-300 cursor-pointer "
                  onClick={() => {
                    reset();
                    onClose();
                  }}
                >
                  annuler
                </Button>
                <Button
                  type="submit"
                  disabled={isPending ? true : false}
                  className={`inline-flex items-center gap-2 rounded-md bg-gray-700 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:not-data-focus:outline-none data-focus:outline data-focus:outline-white data-hover:bg-gray-600 data-open:bg-gray-700 transition-colors duration-300 cursor-pointer ${
                    isPending
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:bg-blue-600"
                  }`}
                >
                  {modalType === "updateClient" ? "Modifier" : "Ajouter "}
                </Button>
              </div>
            </form>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
