import React, { useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Navbar } from "./components/Navbar";
import { Outlet } from "react-router";
import { useLoginStore } from "./store/loginStore";

function App() {
  const loadLogin = useLoginStore((state) => state.loadLogin);
  const token = useLoginStore.getState().token;

  useEffect(() => {
    loadLogin();
  }, [token]);

  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
}

export default App;
