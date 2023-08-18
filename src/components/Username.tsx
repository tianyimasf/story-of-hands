import "./fonts.css";
import Box from "@mui/material/Box";
import NavigationBar from "./NavigationBar";
import { TextField } from "@mui/material";

// TODO: add skip button to create an initial about page
export default function () {
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
      <p
        style={{
          color: "#96B6C5",
          paddingTop: "6vh",
          paddingRight: "47vh",
          textAlign: "right",
          fontFamily: "Gloria Hallelujah",
          fontSize: "24px",
        }}
      >
        <a
          href="/mode"
          style={{ textDecoration: "underline", color: "#96B6C5" }}
        >
          → next
        </a>
      </p>
      <p
        style={{
          color: "#96B6C5",
          paddingLeft: "60vh",
          paddingTop: "7vh",
          fontFamily: "Gloria Hallelujah",
          fontSize: "24px",
        }}
      >
        Please enter your username:
      </p>
      <TextField
        required
        id="standard-required"
        label=""
        defaultValue="Mickey Mouse"
        size="small"
        variant="standard"
        sx={{
          marginLeft: "60vh",
          input: { color: "#ADC4CE" },
        }}
        InputProps={{
          style: {
            fontFamily: "Gloria Hallelujah",
            fontSize: "24px",
          },
        }}
      />
    </Box>
  );
}
