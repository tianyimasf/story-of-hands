import "./fonts.css";
import Box from "@mui/material/Box";
import NavigationBar from "./NavigationBar";
import NextButton from "./NextButton";
import React from "react";
import { message } from "antd";
import { IHandSeries, IImage } from "./types";
import HorizontalImageList from "./HorizontalImageList";
import { TextField } from "@mui/material";

const baseUrl: string = "http://localhost:5000";

interface writeAStoryStates {
  handSeriesId: string | null;
  handSeries: IHandSeries | null;
  storyName: string;
  story: string;
}

// TODO: add skip button to create an initial about page
class WriteAStory extends React.Component<{}, writeAStoryStates> {
  constructor(props: {}) {
    super(props);
    this.state = {
      handSeriesId: null,
      handSeries: null,
      storyName: "",
      story: "",
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
    fetch(baseUrl + `/api/upload/getOne?id=${this.state.handSeriesId}`, {
      headers: { ContentType: "application/json" },
    }).then(async (response) => {
      const result = await response.json();
      if (result.errored) {
        message.error(result.message);
      } else {
        this.setState({ handSeries: result.handSeries });
      }
    });
  }

  renderHandSeriesAndStoryForm = () => {
    return (
      <div>
        <HorizontalImageList
          props={{
            imageData: this.state.handSeries!.images.map((image) => image.data),
          }}
        ></HorizontalImageList>
        <p>Arranger: {this.state.handSeries?.authorName}</p>
        <p>
          Series Name:
          {this.state.handSeries?.name ??
            "the arranger didn't give it a name😳"}
        </p>
        <p>
          Series Description:{" "}
          {this.state.handSeries?.desc ??
            "the arranger didn't give it a description🙏"}
        </p>
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
            onChange={(e) => this.setState({ storyName: e.target.value })}
          />
          <TextField
            required
            id="standard-required"
            defaultValue="Story Content"
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
            multiline
            rows={5}
            maxRows={10}
            onChange={(e) => this.setState({ story: e.target.value })}
          />
        </div>
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
        {this.state.handSeriesId
          ? this.renderHandSeriesAndStoryForm()
          : this.renderErrorMessage()}
      </Box>
    );
  }
}

export default WriteAStory;
