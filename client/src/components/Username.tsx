import "./fonts.css";
import Box from "@mui/material/Box";
import NavigationBar from "./NavigationBar";
import { TextField } from "@mui/material";
import NextButton from "./NextButton";
import { useState } from "react";
import { message } from "antd";

export interface IUser {
  username: string;
  token: string;
  email?: string;
  password?: string;
}

export interface APIIUser {
  message: string;
  status: string;
  user?: IUser;
}

const baseUrl: string = "http://localhost:5000";
// TODO: add skip button to create an initial about page
export default function () {
  const [username, setUserName] = useState<string | null>(null);

  const handleTempRegister = function () {
    if (username === null) {
      message.error("Please update the username");
    }
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username }),
    };

    fetch(baseUrl + "/api/tokenAuth/tempRegister", requestOptions).then(
      async (response) => {
        const user = await response.json();
        localStorage.setItem("username", JSON.stringify(user.username));
        localStorage.setItem("token", JSON.stringify(user.token));
      }
    );
  };

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
          href: username === null ? "#" : "/mode",
          onClick: handleTempRegister,
        }}
      ></NextButton>
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
        onChange={(e) => setUserName(e.target.value)}
      />
    </Box>
  );
}
