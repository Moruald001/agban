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
import {
  createList,
  updateList,
  getList,
  getListLatest,
} from "../../utils/otherFetcher";
import useClientStore from "../../store/clientStore";
// import { useEffect } from "react";
import useAuthStore from "../../store/useAuthStore";

export const Modal = ({ showModal, onClose, modalType, listId, location }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(createListSchema),
  });
  const { lists, create } = useClientStore();
  const isAuthenticated = useAuthStore();

  const { data, refetch } = useQuery({
    queryKey: location === "home" ? ["latest_lists"] : ["lists"],
    queryFn: location === "home" ? getListLatest : getList,
    // @ts-ignore
    onSuccess: () => {
      create(data);
    },
    enabled: isAuthenticated === true ? true : false,
    refetchOnWindowFocus: false,
  });
  const listSelected = lists?.find((item) => item.id === listId);

  const { mutateAsync, isPending } = useMutation({
    mutationFn: modalType === "updateList" ? updateList : createList,
  });

  const onSubmit = async (data) => {
    try {
      await mutateAsync({ data: data, id: listId });

      if (modalType === "updateList") {
        toast.success(`Liste ${data?.name} mise à jour`);

        const res = await refetch();
        console.log(res);

        onClose();
      } else {
        toast.success(`Liste  ${data?.name} crée`);
        await refetch();
        onClose();
      }
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
                  placeholder={
                    modalType === "updateList"
                      ? listSelected?.name
                      : "Ex: liste Juin 2025"
                  }
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
                    {modalType === "updateList" ? "Appliquer" : "Créer"}
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
