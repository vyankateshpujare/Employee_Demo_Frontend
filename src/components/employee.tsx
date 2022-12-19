import { MdDelete, MdSend, MdDeleteForever } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { useEmployeeStore } from "../store/employeeStore";
import { useEffect, useState } from "react";
import { Navigate, NavLink, useNavigate } from "react-router-dom";
import { useLoginStore } from "../store/loginStore";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object().shape({
  percentage: yup.number().required(),
});

export interface perSchema {
  percentage: number;
}

export const Employee = () => {
  const navigate = useNavigate();
  const [incId, setIncId] = useState("");
  const [showId, setShowId] = useState("");
  const employee = useEmployeeStore((state) => state.employee);
  const getAllEmployee = useEmployeeStore((state) => state.getAllEmployee);
  const deleteEmployee = useEmployeeStore((state) => state.deleteEmployee);
  const incrementSalary = useEmployeeStore((state) => state.incrementSalary);
  const token = useLoginStore.getState().token;

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm<perSchema>({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    getAllEmployee();
  }, []);

  const handleDelete = (id: string) => {
    deleteEmployee(id);
  };

  const handleIncrement = (data: perSchema) => {
    reset();
    incrementSalary(incId, data);
    setIncId("");
    navigate("/employee");
  };

  return (
    <div className="overflow-x-auto relative flex justify-center mt-10">
      <table className="w-1/2 text-sm text-left text-gray-500 dark:text-gray-400 shadow-lg">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr className="">
            <th scope="col" className="py-3 px-6">
              Employee
            </th>
            <th scope="col" className="py-3 px-6">
              Department
            </th>
            <th scope="col" className="py-3 px-6">
              Salary
            </th>
            <th></th>

            <th scope="col" className="py-3 px-6 flex justify-center">
              {token !== "" ? (
                <NavLink
                  to="addemployee"
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
          {employee.map((emp) => (
            <tr
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 "
              onMouseOver={() => setShowId(emp._id)}
              onMouseOut={() => setShowId(" ")}
            >
              <td className="py-4 px-6">{emp.name}</td>
              <td className="py-4 px-6">{emp.department.name}</td>
              <td className="py-4 px-6">{emp.salary + " Rs"}</td>
              <td>
                {incId == emp._id ? (
                  <form
                    action=""
                    className="flex items-center"
                    onSubmit={handleSubmit(handleIncrement)}
                  >
                    <input
                      className="border-2 w-16 pl-3"
                      placeholder="%"
                      {...register("percentage")}
                    />
                    <button
                      type="submit"
                      className="h-6 w-6 flex justify-center items-center bg-indigo-600 rounded-full text-white pl-1 ml-2"
                      onClick={() => setIncId(emp._id)}
                    >
                      <MdSend size={18} />
                    </button>
                  </form>
                ) : (
                  <button
                    className="bg-gray-50 rounded-full py-1 px-2"
                    onClick={() => setIncId(emp._id)}
                  >
                    Increment
                  </button>
                )}
              </td>
              <td className="py-4 px-6 flex justify-around">
                {token !== "" ? (
                  showId == emp._id ? (
                    <>
                      <span className="bg-gray-100 h-7 w-10 text-red-500  flex justify-center items-center rounded-full">
                        <MdDeleteForever
                          size={20}
                          className="cursor-pointer"
                          onClick={() => handleDelete(emp._id)}
                        />
                      </span>
                      <span className="bg-gray-100 h-7 w-10  text-indigo-700 flex justify-center items-center rounded-full">
                        <NavLink to={`updateemployee/${emp._id}`}>
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
