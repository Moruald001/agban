import {
  Button,
  Dialog,
  DialogPanel,
  DialogTitle,
  DialogBackdrop,
} from "@headlessui/react";
import { useForm } from "react-hook-form";
import { createListSchema } from "../lib/Schema";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createList } from "../../utils/otherFetcher";
import { getListLatest } from "../../utils/otherFetcher";

export const Modal = ({ showModal, onClose }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(createListSchema),
  });
  const { refetch } = useQuery({
    queryKey: ["lists"],
    queryFn: getListLatest,
  });

  const { mutateAsync, isPending } = useMutation({
    mutationFn: createList,
  });

  const onSubmit = async (data) => {
    try {
      const list = await mutateAsync(data);

      toast.success(`Liste crée ${data.name}`);
      await refetch();
      onClose();
    } catch (error) {
      console.log(error.toString().split(": ")[1]);
      toast.error(error.message || "Erreur lors de la création");
    }
  };
  return (
    <>
      <Dialog
        open={showModal}
        as="div"
        className="relative z-10 "
        onClose={onClose}
        __demoMode
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
                Créer une liste
              </DialogTitle>
              <form
                className="flex  flex-col"
                onSubmit={handleSubmit(onSubmit)}
              >
                <label
                  className="text-lg   text-gray-700 font-bold my-4 "
                  htmlFor="name"
                >
                  Nom de la liste
                </label>
                <input
                  className={`border-1 border-solid rounded-[0.6em] border-gray-400 p-2 min-w-3xs text-center focus:outline-hidden`}
                  type="text"
                  id="name"
                  placeholder="Ex:liste Juin 2025"
                  {...register("name")}
                />
                {errors.name && (
                  <p className="text-red-400 text-center  after:content-['⚠️']">
                    {errors.name.message}
                  </p>
                )}

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
                    className="inline-flex items-center gap-2 rounded-md bg-gray-700 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:not-data-focus:outline-none data-focus:outline data-focus:outline-white data-hover:bg-gray-600 data-open:bg-gray-700 transition-colors duration-300 cursor-pointer"
                  >
                    Créer
                  </Button>
                </div>
              </form>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
};
