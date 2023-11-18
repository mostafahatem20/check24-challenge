import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./utils/theme";
import routes from "./utils/routes.json";

const router = createBrowserRouter([
  {
    id: "root",
    path: routes.home,
    Component: Home,
  },
  {
    path: routes.admin,
    Component: Admin,
  },
]);

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}
