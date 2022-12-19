import axios from "axios";
import create from "zustand";
import { useLoginStore } from "./loginStore";

const apiEndPoint = "http://localhost:3030/departments";

export interface Obj {
  _id: string;
  name: string;
  updatedAt: string;
}

type DeptStore = {
  departments: Obj[];
  currentDepartment: Obj | null;
  getAllDepartments: () => void;
  addDepartment: (data: Obj) => void;
  deleteDepartment: (id: string) => void;
  getCurrentDepartment: (id: string) => void;
  updateDepartment: (data: Obj) => void;
};

export const useDeptStore = create<DeptStore>((set) => ({
  departments: [],
  currentDepartment: null,

  getAllDepartments: async () => {
    const response = await axios.get(apiEndPoint);
    set({ departments: response.data.data });
  },

  getCurrentDepartment: async (id: string) => {
    const response = await axios.get(apiEndPoint + "/" + id);
    set((state) => ({ ...state, currentDepartment: response.data }));
  },

  addDepartment: async (data: Obj) => {
    const token = useLoginStore.getState().token;
    const response = await axios.post(apiEndPoint, data, {
      headers: { Authorization: token },
    });
    set((state) => ({
      ...state,
      departments: [...state.departments, response.data],
    }));
  },

  updateDepartment: async (data: Obj) => {
    const token = useLoginStore.getState().token;
    const response = await axios.put(
      apiEndPoint + "/" + data._id,
      {
        name: data.name,
      },
      { headers: { Authorization: token } }
    );
    set((state) => ({
      ...state,
      departments: state.departments.map((dept: Obj) =>
        dept._id === response.data._id ? { ...response.data } : dept
      ),
    }));
  },
  deleteDepartment: async (id: string) => {
    const token = useLoginStore.getState().token;
    const response = await axios.delete(apiEndPoint + "/" + id, {
      headers: { Authorization: token },
    });
    set((state) => ({
      ...state,
      departments: state.departments.filter((dept: Obj) => dept._id !== id),
    }));
  },
}));
