import { useMutation, useQuery } from "@tanstack/react-query";
import { deleteList, getList } from "../../utils/otherFetcher";
import dayjs from "dayjs";
import { Pen } from "lucide-react";
import { Trash } from "lucide-react";
import toast from "react-hot-toast";

export const List = () => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["lists"],
    queryFn: getList,
  });

  const { mutateAsync } = useMutation({
    mutationFn: deleteList,
  });

  const handleDelete = async (id) => {
    const response = confirm("vous etes sur le point de supprimer cette liste");
    if (!response) {
      return;
    }
    try {
      await mutateAsync(id);
      toast.success("Suppression effectué");
      await refetch();
    } catch (error) {
      console.log(error);
      toast.error(`Erreur lors de la suppression ${error}`);
    }
  };

  return (
    <div className="w-screen h-screen  flex flex-col justify-center items-center gap-10 ">
      <h1 className="text-2xl text-gray-500 text-center">Toutes les listes</h1>
      <div className="overflow-x-auto ">
        <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100 ">
          <table className="table table-zebra ">
            {/* head */}
            <thead>
              <tr>
                <th>No</th>
                <th>Nom</th>
                <th>Date de creation</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data.lists.map((list) => (
                <tr>
                  <th>{list.id} </th>
                  <td className="capitalize">{list.name} </td>
                  <td>{dayjs(list.createdAt).format("DD/MM/YYYY")} </td>
                  <td className="flex gap-2 items-center">
                    <button className="cursor-pointer">
                      <Pen color="black" size={15} />
                    </button>
                    <button
                      className="cursor-pointer"
                      onClick={() => handleDelete(list.id)}
                    >
                      <Trash color="black" size={15} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
