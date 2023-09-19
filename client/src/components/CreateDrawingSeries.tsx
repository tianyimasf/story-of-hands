import "./fonts.css";
import Box from "@mui/material/Box";
import NavigationBar from "./NavigationBar";
import NextButton from "./NextButton";
import { TextField } from "@mui/material";
import DragNDropImages from "./DragNDropImages";
import { getBase64 } from "./DragNDropImages";
import { useState } from "react";
import { UploadFile, message } from "antd";
import { RcFile } from "antd/es/upload";
import HorizontalImageList from "./HorizontalImageList";
import { IHandSeries } from "./types";

const baseUrl: string = "http://localhost:5000";

// TODO: add skip button to create an initial about page
export default function CreateDrawingSeries() {
  const images = require.context("../images/hands_small/", true);
  const imageData = images.keys().map((image: string) => images(image));
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [name, setName] = useState<string | null>(null);
  const [desc, setDesc] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [newHandSeries, setNewHandSeries] = useState<IHandSeries | null>(null);

  const processImageFileList = async function (fileList: UploadFile[]) {
    return await Promise.all(
      fileList.map(async (file, index) => {
        const data: string = await getBase64(file.originFileObj as RcFile);
        return {
          name: `hand.jpg`,
          data,
          contentType: file.type,
        };
      })
    );
  };

  const handleSubmitImageSeries = async function () {
    if (fileList === null || fileList.length === 1) {
      message.error("Please include at least 2 images.");
    }
    const images = await processImageFileList(fileList);
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        images,
        authorToken: localStorage.token,
        authorName: localStorage.username,
        name: name ?? "",
        desc: desc ?? "",
        email: email ?? "",
      }),
    };

    fetch(baseUrl + "/api/upload/", requestOptions).then(async (response) => {
      const result = await response.json();
      if (result.errored) {
        message.error(result.message);
      } else {
        message.success(result.message);
        setNewHandSeries(result.newHandSeries);
      }
    });
  };

  const renderNewHandSeriesNotif = function () {
    return (
      <p
        style={{
          marginLeft: "50vh",
          marginTop: "4vh",
          fontFamily: "Gloria Hallelujah",
          fontSize: "24px",
          color: "#ADC4CE",
        }}
      >
        Here is the link to your new hand image series: /handseries?id=
        {newHandSeries?._id}. If you don't have an account, please save this
        link so that you or your friends can go back to this series again.
      </p>
    );
  };

  return (
    <Box
      sx={{
        bgcolor: "#F1F0E8",
        border: 1,
        borderColor: "#F1F0E8",
        height: "150vh",
      }}
    >
      <NavigationBar></NavigationBar>
      <NextButton
        props={{
          href: undefined,
          onClick: handleSubmitImageSeries,
        }}
      ></NextButton>
      <HorizontalImageList props={{ imageData }}></HorizontalImageList>
      <DragNDropImages props={{ fileList, setFileList }}></DragNDropImages>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          marginRight: "50vh",
        }}
      >
        <TextField
          required
          id="standard-required"
          defaultValue="Story Name"
          size="small"
          variant="standard"
          sx={{
            marginLeft: "50vh",
            marginTop: "4vh",
            input: { color: "#ADC4CE" },
          }}
          InputProps={{
            style: {
              fontFamily: "Gloria Hallelujah",
              fontSize: "24px",
            },
          }}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          required
          id="standard-required"
          defaultValue="Story Description"
          size="small"
          variant="standard"
          sx={{
            marginLeft: "50vh",
            marginTop: "4vh",
            input: { color: "#ADC4CE" },
          }}
          InputProps={{
            style: {
              fontFamily: "Gloria Hallelujah",
              fontSize: "24px",
            },
          }}
          onChange={(e) => setDesc(e.target.value)}
        />
        <TextField
          required
          id="standard-required"
          defaultValue="Email (for sending responses)"
          size="small"
          variant="standard"
          sx={{
            marginLeft: "50vh",
            marginTop: "4vh",
            input: { color: "#ADC4CE" },
          }}
          InputProps={{
            style: {
              fontFamily: "Gloria Hallelujah",
              fontSize: "24px",
            },
          }}
          onChange={(e) => setEmail(e.target.value)}
        />
        {newHandSeries ? renderNewHandSeriesNotif() : null}
      </div>
    </Box>
  );
}
