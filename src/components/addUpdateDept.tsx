import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Obj, useDeptStore } from "../store/departmentStore";
import { useEffect } from "react";
import { useLoaderData, useNavigate } from "react-router";

const schema = yup.object().shape({
  name: yup.string().required(),
});

export const getDeptId = ({ params }: any) => {
  return params.id;
};

export const AddUpdateDepartment = () => {
  const navigate = useNavigate();
  const addDepartment = useDeptStore((state) => state.addDepartment);
  const updateDepartment = useDeptStore((state) => state.updateDepartment);

  let currentDepartment = useDeptStore((state) => state.currentDepartment);
  const getCurrentDepartment = useDeptStore(
    (state) => state.getCurrentDepartment
  );

  const deptId = useLoaderData();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm<Obj>({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    reset();
    if (deptId) {
      getCurrentDepartment(deptId as string);
    }
  }, []);

  useEffect(() => {
    if (currentDepartment) {
      setValue("name", currentDepartment.name);
      setValue("_id", currentDepartment._id);
    }
  }, [currentDepartment]);

  const handleAddUpdate = (data: Obj) => {
    if (data._id) {
      updateDepartment(data);
    } else {
      addDepartment(data);
    }
    navigate("/departments");
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

        <div className="flex justify-center mt-3">
          <button type="submit" className="bg-blue-800 text-white rounded">
            SUBMIT
          </button>
        </div>
      </form>
    </div>
  );
};
