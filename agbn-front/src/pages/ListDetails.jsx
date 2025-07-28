import React from "react";
import { useParams } from "react-router-dom";
import useClientStore from "../../store/clientStore";
import NavBar from "../components/NavBar";
import { number } from "yup";

export default function ListDetails() {
  const listId = useParams();
  const { lists } = useClientStore();
  const idNumber = Number(listId.id);
  const listSelected = lists?.find((list) => list.id == idNumber);

  return (
    <>
      <NavBar />
      <div>
        <h1 className="text-center text-2xl">{listSelected?.name} </h1>
        <div className="overflow-x-auto">
          <table className="table table-xs">
            <thead>
              <tr>
                <th></th>
                <th>Name</th>
                <th>Job</th>
                <th>company</th>
                <th>location</th>
                <th>Last Login</th>
                <th>Favorite Color</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>1</th>
                <td>Cy Ganderton</td>
                <td>Quality Control Specialist</td>
                <td>Littel, Schaden and Vandervort</td>
                <td>Canada</td>
                <td>12/16/2020</td>
                <td>Blue</td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <th></th>
                <th>Name</th>
                <th>Job</th>
                <th>company</th>
                <th>location</th>
                <th>Last Login</th>
                <th>Favorite Color</th>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </>
  );
}
