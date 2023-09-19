import "./fonts.css";
import Box from "@mui/material/Box";
import NavigationBar from "./NavigationBar";
import NextButton from "./NextButton";
import React from "react";
import { message } from "antd";
import { IHandSeries, IImage } from "./types";
import HorizontalImageList from "./HorizontalImageList";
import { TextField } from "@mui/material";
import HandSeriesBasicInfo from "./HandSeriesBasicInfo";

const baseUrl: string = "http://localhost:5000";

interface WriteAStoryStates {
  handSeriesId: string | null;
  handSeries: IHandSeries | null;
  storyName: string;
  story: string;
  writerName: string;
}

// TODO: add skip button to create an initial about page
class WriteAStory extends React.Component<{}, WriteAStoryStates> {
  constructor(props: {}) {
    super(props);
    this.state = {
      handSeriesId: null,
      handSeries: null,
      storyName: "",
      story: "",
      writerName: "",
    };
  }

  componentDidMount(): void {
    const queryParameters = new URLSearchParams(window.location.search);
    const handSeriesId = queryParameters.get("id");

    if (!handSeriesId) {
      message.error(
        'Please provide a series Id (in the url add "?id=<series_id>" in the end)'
      );
      return;
    }

    this.setState({ handSeriesId });
    fetch(baseUrl + `/api/upload/getOne?id=${handSeriesId}`, {
      headers: { ContentType: "application/json" },
    }).then(async (response) => {
      const result = await response.json();
      if (result.errored) {
        message.error(result.message);
      } else {
        this.setState({ handSeries: result.handSeries });
        console.log(this.state.handSeries, result.handSeries);
      }
    });
  }

  renderSubmitButton = () => {
    return (
      <p
        style={{
          color: "#96B6C5",
          paddingTop: "4vh",
          paddingRight: "47vh",
          textAlign: "right",
          fontFamily: "Gloria Hallelujah",
          fontSize: "24px",
        }}
      >
        <a href="#" style={{ textDecoration: "underline", color: "#96B6C5" }}>
          → Submit
        </a>
      </p>
    );
  };

  renderHandSeriesAndStoryForm = () => {
    console.log(this.state.handSeries);
    return (
      <div>
        <HandSeriesBasicInfo
          props={{ handSeries: this.state.handSeries! }}
        ></HandSeriesBasicInfo>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginRight: "47vh",
          }}
        >
          <TextField
            required
            id="standard-required"
            defaultValue="Story Name"
            size="small"
            variant="outlined"
            sx={{
              marginLeft: "47vh",
              marginTop: "1vh",
              input: { color: "#ADC4CE" },
            }}
            InputProps={{
              style: {
                fontFamily: "Gloria Hallelujah",
                fontSize: "24px",
              },
            }}
            onChange={(e) => this.setState({ storyName: e.target.value })}
          />
          <TextField
            required
            id="standard-required"
            defaultValue="Storyline"
            size="small"
            variant="outlined"
            sx={{
              marginLeft: "47vh",
              marginTop: "2vh",
            }}
            InputProps={{
              style: {
                fontFamily: "Gloria Hallelujah",
                fontSize: "24px",
                color: "#ADC4CE",
              },
            }}
            multiline
            rows={8}
            maxRows={10}
            onChange={(e) => this.setState({ story: e.target.value })}
          />
          <TextField
            required
            id="standard-required"
            defaultValue="Your Username"
            size="small"
            variant="outlined"
            sx={{
              marginLeft: "47vh",
              marginTop: "2vh",
              input: { color: "#ADC4CE" },
            }}
            InputProps={{
              style: {
                fontFamily: "Gloria Hallelujah",
                fontSize: "24px",
              },
            }}
            onChange={(e) => this.setState({ writerName: e.target.value })}
          />
        </div>
        {this.renderSubmitButton()}
      </div>
    );
  };

  renderErrorMessage = () => {
    return (
      <p>
        No Hand Series ID specified!😔 Please remember to include the ID of your
        desired hand series. To do that, in the url add "?id=[series_id]" in the
        end.
      </p>
    );
  };

  render() {
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
          }}
        ></NextButton>
        {this.state.handSeriesId && this.state.handSeries
          ? this.renderHandSeriesAndStoryForm()
          : this.renderErrorMessage()}
      </Box>
    );
  }
}

export default WriteAStory;
