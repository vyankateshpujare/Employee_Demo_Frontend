import create from "zustand";
import axios from "axios";

const apiEndPoint = "http://localhost:3030/authentication";

interface Obj {
  email: string;
  password: String;
  strategy: String;
}

type LoginStore = {
  token: string | null;
  getToken: (data: Obj) => void;
  loadLogin: () => void;
  logOut: () => void;
};

export const useLoginStore = create<LoginStore>((set) => ({
  token: "",

  getToken: async (data) => {
    const response = await axios.post(apiEndPoint, data);
    const token = response.data.accessToken;
    sessionStorage.setItem("token", token);
    set({ token });
  },

  loadLogin: () => {
    set({ token: sessionStorage.getItem("token") });
  },

  logOut: async () => {
    sessionStorage.setItem("token", "");
    set({ token: "" });
  },
}));
