import * as React from "react";
import "./fonts.css";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

export default function NavigationBar() {
  return (
    <Box>
      <AppBar
        position="static"
        style={{ background: "transparent", boxShadow: "none" }}
      >
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{
              flexGrow: 1,
              fontFamily: "Tangerine",
              fontSize: "38px",
              paddingLeft: "5vh",
              paddingTop: "2.5vh",
            }}
          >
            <a href="/" style={{ color: "#96B6C5", textDecoration: "none" }}>
              Story of Hands
            </a>
          </Typography>
          <Box
            sx={{
              display: {
                xs: "none",
                sm: "block",
                paddingTop: "1vh",
                paddingRight: "5vh",
              },
            }}
          >
            <Button
              href="/login"
              color="inherit"
              sx={{
                color: "#96B6C5",
                fontFamily: "Gloria Hallelujah",
                fontSize: "18px",
                paddingRight: "2vh",
              }}
            >
              Login
            </Button>
            <Button
              href="/about"
              color="inherit"
              sx={{
                color: "#96B6C5",
                fontFamily: "Gloria Hallelujah",
                fontSize: "18px",
                paddingRight: "2vh",
              }}
            >
              About
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
