import "./fonts.css";
import Box from "@mui/material/Box";
import NavigationBar from "./NavigationBar";
import NextButton from "./NextButton";
import React from "react";
import { message } from "antd";
import { IHandSeries, IStory } from "./types";
import HandSeriesBasicInfo from "./HandSeriesBasicInfo";

const baseUrl: string = "http://localhost:5000";

interface HandSeriesStates {
  handSeriesId: string | null;
  handSeries: IHandSeries | null;
}

// TODO: add skip button to create an initial about page
export default class HandSeries extends React.Component<{}, HandSeriesStates> {
  constructor(props: {}) {
    super(props);
    this.state = {
      handSeriesId: null,
      handSeries: null,
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
      }
    });
  }

  renderWriteAStoryButton = () => {
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
        <a
          href="/writeastory"
          style={{ textDecoration: "underline", color: "#96B6C5" }}
        >
          → write your own story
        </a>
      </p>
    );
  };

  renderStoryWritten = (story: IStory) => {
    return (
      <div>
        <p>{story.story}</p>
        <p>Author: {story.authorName}</p>
      </div>
    );
  };

  renderStoriesWritten = () => {
    if (
      this.state.handSeries?.stories &&
      this.state.handSeries?.stories.length > 0
    ) {
      return this.state.handSeries?.stories?.map((story) =>
        this.renderStoryWritten(story)
      );
    }
    return (
      <p
        style={{
          color: "#96B6C5",
          paddingTop: "2vh",
          paddingLeft: "47vh",
          textAlign: "left",
          fontFamily: "Gloria Hallelujah",
          fontSize: "24px",
        }}
      >
        No story has been written about this series yet. Be the first one!{" "}
      </p>
    );
  };

  renderHandSeriesData = () => {
    return (
      <div>
        <HandSeriesBasicInfo
          props={{ handSeries: this.state.handSeries! }}
        ></HandSeriesBasicInfo>
        {this.renderWriteAStoryButton()}
        {this.renderStoriesWritten()}
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
        {this.state.handSeriesId ? null : this.renderErrorMessage()}
        {this.state.handSeries ? this.renderHandSeriesData() : null}
      </Box>
    );
  }
}
