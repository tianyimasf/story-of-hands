import "./fonts.css";
import Box from "@mui/material/Box";
import NavigationBar from "./NavigationBar";
import NextButton from "./NextButton";
import { ImageList, ImageListItem, TextField } from "@mui/material";
import DragNDropImages from "./DragNDropImages";
import { getBase64 } from "./DragNDropImages";
import { useState } from "react";
import { UploadFile, message } from "antd";
import { RcFile } from "antd/es/upload";

const baseUrl: string = "http://localhost:5000";

// TODO: add skip button to create an initial about page
export default function CreateDrawingSeries() {
  const images = require.context("../images/hands_small/", true);
  const imageData = images.keys().map((image: string) => images(image));
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [name, setName] = useState<string | null>(null);
  const [desc, setDesc] = useState<string | null>(null);

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
      }),
    };

    fetch(baseUrl + "/api/upload/", requestOptions).then(async (response) => {
      const result = await response.json();
      if (result.errored) {
        message.error(result.message);
      } else {
        message.success(result.message);
      }
    });
  };

  return (
    <Box
      sx={{
        bgcolor: "#F1F0E8",
        border: 1,
        borderColor: "#F1F0E8",
        height: "200vh",
      }}
    >
      <NavigationBar></NavigationBar>
      <NextButton
        props={{
          href: "#",
          onClick: handleSubmitImageSeries,
        }}
      ></NextButton>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-around",
          overflow: "hidden",
          backgroundColor: "#F1F0E8",
          marginLeft: "50vh",
          marginRight: "50vh",
          marginTop: "5vh",
        }}
      >
        <ImageList
          style={{ flexWrap: "nowrap", overflowX: "auto" }}
          cols={1}
          rowHeight={110}
        >
          、
          <ImageListItem sx={{ display: "flex", flexDirection: "row" }}>
            {imageData.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`hand-drawing-${index}`}
                style={{ marginRight: "1vh" }}
              />
            ))}
          </ImageListItem>
        </ImageList>
      </div>
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
      </div>
    </Box>
  );
}
