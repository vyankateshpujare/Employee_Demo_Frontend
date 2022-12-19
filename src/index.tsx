import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import {
  createBrowserRouter,
  RouterProvider,
  useLoaderData,
} from "react-router-dom";
import { Department } from "./components/Department";
import { Login } from "./components/login";
import { Employee } from "./components/employee";
import { AddUpdateEmployee, getEmpId } from "./components/addUpdateEmployee";
import { AddUpdateDepartment, getDeptId } from "./components/addUpdateDept";
import { Home } from "./components/home";
import { Register } from "./components/register";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },

      {
        index: true,
        element: <Home />,
      },
      {
        path: "home",
        element: <Home />,
      },
      {
        path: "departments",
        element: <Department />,
      },
      {
        path: "departments/adddepartment",
        element: <AddUpdateDepartment />,
      },
      {
        path: "departments/updatedepartment/:id",
        element: <AddUpdateDepartment />,
        loader: getDeptId,
      },
      {
        path: "employee",
        element: <Employee />,
      },
      {
        path: "employee/addemployee",
        element: <AddUpdateEmployee />,
      },
      {
        path: "employee/updateemployee/:id",
        element: <AddUpdateEmployee />,
        loader: getEmpId,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
