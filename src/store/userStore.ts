import axios from "axios";
import create from "zustand";

const apiEndPoint = "http://localhost:3030/users";

export interface UserData {
  email: string;
  password: string;
}

type userstore = {
  users: UserData[];
  addUser: (data: UserData) => void;
};
export const useUserStore = create<userstore>((set) => ({
  users: [],

  addUser: async (data) => {
    const response = await axios.post(apiEndPoint, data);
    set((state) => ({
      ...state,
      users: [...state.users, response.data],
    }));
  },
}));
