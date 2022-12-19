import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDeptStore } from "../store/departmentStore";
import { useEffect } from "react";
import { useEmployeeStore } from "../store/employeeStore";
import { useLoaderData, useNavigate } from "react-router";

const schema = yup.object().shape({
  name: yup.string().min(2).max(20).required(),
  department: yup.string().required(),
  salary: yup.number().required(),
  age: yup.number(),
});

interface DeptData {
  _id: string;
  name: string;
}

interface EmpSchema {
  _id: string;
  name: string;
  department: DeptData;
  salary: number;
  age: number;
}

export const getEmpId = ({ params }: any) => {
  return params.id;
};

export const AddUpdateEmployee = () => {
  const navigate = useNavigate();
  const departments = useDeptStore((state) => state.departments);
  const getAllDepartments = useDeptStore((state) => state.getAllDepartments);
  const addEmployee = useEmployeeStore((state) => state.addEmployee);
  const updateEmployee = useEmployeeStore((state) => state.updateEmployee);
  const getCurrentEmployee = useEmployeeStore(
    (state) => state.getCurrentEmployee
  );
  const currentEmployee = useEmployeeStore((state) => state.currentEmployee);

  const empId = useLoaderData();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm<EmpSchema>({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    reset();
    getAllDepartments();
    if (empId) {
      getCurrentEmployee(empId as string);
    }
  }, []);

  useEffect(() => {
    if (currentEmployee) {
      setValue("name", currentEmployee.name);
      setValue("department.name", currentEmployee.department.name );
      setValue("salary", currentEmployee.salary);
      setValue("age", currentEmployee.age);
      setValue("_id", currentEmployee._id);
    }
  }, [currentEmployee]);

  const handleAddUpdate = (data: EmpSchema) => {
    if (data._id) {
      updateEmployee(data);
    } else {
      addEmployee(data);
    }
    navigate("/employee");
  };

  return (
    <div className="">
      <form
        action=""
        className="shadow w-[20%]  p-4"
        onSubmit={handleSubmit(handleAddUpdate)}
      >
        <div className="">
          <label htmlFor="">name</label>
          <input
            type="text"
            id=""
            className="border-2  rounded ml-2"
            {...register("name")}
          />
        </div>
        <div className=" mt-2">
          <label htmlFor="">department</label>
          <select id="" className="border-2" {...register("department")}>
            {departments.map((dept) => (
              <option value={dept._id} key={dept._id}>
                {dept.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mt-2">
          <label htmlFor="">salary</label>
          <input
            type="text"
            id=""
            className="border-2  rounded ml-2"
            {...register("salary")}
          />
        </div>
        <div className="mt-2">
          <label htmlFor="">age</label>
          <input
            type="text"
            id=""
            className="border-2  rounded ml-2"
            {...register("age")}
          />
        </div>
        <div className="flex justify-center mt-3">
          <button type="submit" className="bg-blue-800 text-white rounded">
            SUBMIT
          </button>
        </div>
      </form>
    </div>
  );
};
