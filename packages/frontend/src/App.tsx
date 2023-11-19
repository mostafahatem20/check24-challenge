import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import theme from "./utils/theme";
import routes from "./utils/routes.json";
import {
  experimental_extendTheme as materialExtendTheme,
  Experimental_CssVarsProvider as MaterialCssVarsProvider,
  THEME_ID as MATERIAL_THEME_ID,
} from "@mui/material/styles";
import { CssVarsProvider as JoyCssVarsProvider } from "@mui/joy/styles";
import CssBaseline from "@mui/material/CssBaseline";

const materialTheme = materialExtendTheme(theme);

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
    <MaterialCssVarsProvider theme={{ [MATERIAL_THEME_ID]: materialTheme }}>
      <JoyCssVarsProvider>
        <CssBaseline enableColorScheme />
        <RouterProvider router={router} />
      </JoyCssVarsProvider>
    </MaterialCssVarsProvider>
  );
}
