import "./fonts.css";
import Box from "@mui/material/Box";
import NavigationBar from "./NavigationBar";
import { Button } from "@mui/material";
import NextButton from "./NextButton";
import { useState } from "react";

// TODO: add skip button to create an initial about page
export default function Mode() {
  const [mode, setMode] = useState(0);
  console.log(mode);

  return (
    <Box
      sx={{
        bgcolor: "#F1F0E8",
        border: 1,
        borderColor: "#F1F0E8",
        height: "100vh",
      }}
    >
      <NavigationBar></NavigationBar>
      <NextButton
        props={{
          href: mode === 0 ? "/createdrawingseries" : "/responddrawingseries",
        }}
      ></NextButton>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          marginTop: "18vh",
        }}
      >
        <Button
          variant="outlined"
          sx={{
            color: "#96B6C5",
            fontFamily: "Gloria Hallelujah",
            fontSize: "18px",
            marginLeft: "2.5vh",
            marginRight: "6vh",
          }}
          onClick={() => setMode(0)}
          href="/createdrawingseries"
        >
          Create a Hand Drawing Series
        </Button>
        <Button
          variant="outlined"
          sx={{
            color: "#96B6C5",
            fontFamily: "Gloria Hallelujah",
            fontSize: "18px",
            marginLeft: "1vh",
          }}
          onClick={() => setMode(1)}
          href="/responddrawingseries"
        >
          Respond to a Hand Drawing Series
        </Button>
      </Box>
    </Box>
  );
}
