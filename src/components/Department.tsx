import { MdDelete, MdDeleteForever } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { useDeptStore } from "../store/departmentStore";
import { useEffect, useState } from "react";
import * as yup from "yup";
import { NavLink } from "react-router-dom";
import { useLoginStore } from "../store/loginStore";

const schema = yup.object().shape({
  name: yup.string().min(2).max(50).required(),
});

export interface dept {
  _id: string;
  name: string;
  updatedAt: string;
}

export const Department = () => {
  const [showId, setShowId] = useState("");
  const departments = useDeptStore((state) => state.departments);
  const getAllDepartments = useDeptStore((state) => state.getAllDepartments);
  const deleteDepartment = useDeptStore((state) => state.deleteDepartment);
  const token = useLoginStore.getState().token;

  useEffect(() => {
    getAllDepartments();
  }, []);

  const handleDelete = (id: string) => {
    deleteDepartment(id);
  };

  return (
    <div className="overflow-x-auto relative flex justify-center mt-10">
      <table className="w-1/2 text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="py-3 px-6">
              Departments
            </th>
            <th scope="col" className="py-3 px-6">
              Created/UpdatedAt
            </th>
            <th scope="col" className="py-3 px-6 flex justify-center">
              {token !== "" ? (
                <NavLink
                  to="adddepartment"
                  className="bg-yellow-300 cursor-pointer w-12 h-6 flex justify-center items-center rounded-full"
                >
                  ADD
                </NavLink>
              ) : (
                ""
              )}
            </th>
          </tr>
        </thead>
        <tbody>
          {departments.map((dept: dept) => (
            <tr
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
              onMouseOver={() => setShowId(dept._id)}
              onMouseOut={() => setShowId(" ")}
            >
              <td className="py-4 px-6">{dept.name}</td>
              <td className="py-4 px-6">
                {new Date(dept.updatedAt).toLocaleString()}
              </td>
              <td className="py-4 px-6 flex justify-around">
                {token !== "" ? (
                  showId == dept._id ? (
                    <>
                      {" "}
                      <span className="bg-gray-100 h-7 w-10 text-red-500  flex justify-center items-center rounded-full">
                        {" "}
                        <MdDeleteForever
                          size={20}
                          className="cursor-pointer"
                          onClick={() => handleDelete(dept._id)}
                        />
                      </span>
                      <span className="bg-gray-100 h-7 w-10  text-indigo-700 flex justify-center items-center rounded-full">
                        <NavLink to={`updatedepartment/${dept._id}`}>
                          <FaEdit size={20} className="cursor-pointer" />
                        </NavLink>
                      </span>
                    </>
                  ) : (
                    ""
                  )
                ) : (
                  ""
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
