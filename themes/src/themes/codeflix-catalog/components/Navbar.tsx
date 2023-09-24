import React from "react";
import logo from "../../../static/img/logo.png";
import { AppBar, Toolbar, Typography, styled } from "@mui/material";

const Image = styled("img")(({ theme }) => ({
  width: 100,
  [theme.breakpoints.up("sm")]: {
    width: 170,
  },
}));

export const Navbar: React.FunctionComponent = () => {
  return (
    <AppBar>
      <Toolbar sx={{ backgroundColor: "#000000" }}>
        <Typography
          sx={{
            flexGrow: 1,
            textAlign: "center",
          }}
        >
          <Image src={logo} alt="CodeFlix" />
        </Typography>
      </Toolbar>
    </AppBar>
  );
};
