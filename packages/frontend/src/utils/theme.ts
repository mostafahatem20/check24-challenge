import { createTheme } from "@mui/material/styles";

// Replace these colors with the Check24 color scheme
const check24Colors = {
  primary: "#063773",
  secondary: "#000000",
};

const theme = createTheme({
  palette: {
    primary: {
      main: check24Colors.primary,
    },
    secondary: {
      main: check24Colors.secondary,
    },
    // You can define other colors such as text, background, etc.
    // For example:
    // text: {
    //   primary: '#333333',
    // },
    // background: {
    //   default: '#ffffff',
    // },
  },
});

export default theme;
