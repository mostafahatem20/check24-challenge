import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Admin from "./pages/Admin";

const router = createBrowserRouter([
  {
    id: "root",
    path: "/",
    Component: Home,
  },
  {
    path: "/admin",
    Component: Admin,
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
