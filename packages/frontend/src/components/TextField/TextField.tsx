import React from "react";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

interface ITextField {
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClick: () => void;
  value: string;
}

const TextField: React.FC<ITextField> = ({
  placeholder,
  onChange,
  value,
  onClick,
}) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const handleKeyPress = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter") {
      event.preventDefault(); // Prevent default behavior of Enter key
      onClick(); // Trigger the onClick function when Enter is pressed
    }
  };

  return (
    <Paper
      component="form"
      sx={{
        p: "2px 4px",
        display: "flex",
        alignItems: "center",
        width: isSmallScreen ? "100%" : 400, // Adjust width based on screen size
      }}
    >
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder={placeholder}
        inputProps={{ "aria-label": `${placeholder}` }}
        onChange={onChange}
        value={value}
        onKeyPress={handleKeyPress} // Handle key press event
      />
      <IconButton
        type="button"
        sx={{ p: "10px" }}
        aria-label="search"
        onClick={onClick}
      >
        <SearchIcon />
      </IconButton>
    </Paper>
  );
};

export default TextField;
