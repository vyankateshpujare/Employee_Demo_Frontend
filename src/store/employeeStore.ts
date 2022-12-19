import create from "zustand";
import axios from "axios";
import { useLoginStore } from "./loginStore";
import { idText } from "typescript";
import { perSchema } from "../components/employee";

const apiEndPoint = "http://localhost:3030/api/employee";

interface DeptData {
  _id: string;
  name: string;
}

interface EmpData {
  _id: string;
  name: string;
  salary: number;
  age: number;
  department: DeptData;
}

type EmpStore = {
  employee: EmpData[];
  currentEmployee: EmpData | null;
  getAllEmployee: () => void;
  addEmployee: (data: EmpData) => void;
  deleteEmployee: (id: string) => void;
  getCurrentEmployee: (id: string) => void;
  updateEmployee: (data: EmpData) => void;
  incrementSalary: (id: string, data: perSchema) => void;
};

export const useEmployeeStore = create<EmpStore>((set) => ({
  employee: [],
  currentEmployee: null,

  getAllEmployee: async () => {
    const response = await axios.get(apiEndPoint);
    set({ employee: response.data.data });
  },

  getCurrentEmployee: async (id) => {
    const response = await axios.get(apiEndPoint + "/" + id);
    set((state) => ({ ...state, currentEmployee: response.data }));
  },

  addEmployee: async (data) => {
    const token = useLoginStore.getState().token;
    const response = await axios.post(
      apiEndPoint,
      {
        name: data.name,
        deptId: data.department,
        salary: data.salary,
        age: data.age,
      },
      { headers: { authorization: token } }
    );
    set((state) => ({
      ...state,
      employee: [...state.employee, response.data],
    }));
  },

  updateEmployee: async (data) => {
    const token = useLoginStore.getState().token;
    const response = await axios.put(
      apiEndPoint + "/" + data._id,
      {
        name: data.name,
        deptId: data.department,
        salary: data.salary,
        age: data.age,
      },
      { headers: { authorization: token } }
    );
    set((state) => ({
      ...state,
      employee: [...state.employee, response.data],
    }));
  },

  incrementSalary: async (id, data) => {
    const token = useLoginStore.getState().token;
    const response = await axios.patch(apiEndPoint + "/" + id, data, {
      headers: { Authorization: token },
    });
    console.log(response);

    set((state) => ({
      ...state,
      employee: state.employee.map((emp: EmpData) => {
        if (emp._id === response.data._id) {
          emp = response.data;
        }
        return emp;
      }),
    }));
  },

  deleteEmployee: async (id) => {
    const token = useLoginStore.getState().token;
    const response = await axios.delete(apiEndPoint + "/" + id, {
      headers: { authorization: token },
    });
    set((state) => ({
      ...state,
      employee: state.employee.filter(
        (emp: EmpData) => response.data._id !== emp._id
      ),
    }));
  },
}));
