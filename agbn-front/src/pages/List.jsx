import { useQuery } from "@tanstack/react-query";
import { getList } from "../../utils/otherFetcher";
import dayjs from "dayjs";

export const List = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["lists"],
    queryFn: getList,
  });
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
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data.lists.map((list) => (
                <tr>
                  <th>{list.id} </th>
                  <td>{list.name} </td>
                  <td>fjsidjfjlk</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
