import "./fonts.css";
import Box from "@mui/material/Box";
import NavigationBar from "./NavigationBar";
import { Button } from "@mui/material";

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
        >
          Respond to a Hand Drawing Series
        </Button>
      </Box>
    </Box>
  );
}
