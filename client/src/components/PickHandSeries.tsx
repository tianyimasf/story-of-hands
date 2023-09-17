import "./fonts.css";
import Box from "@mui/material/Box";
import NavigationBar from "./NavigationBar";
import NextButton from "./NextButton";
import React from "react";
import { useState } from "react";
import { IHandSeries } from "./types";
import { message } from "antd";

const baseUrl: string = "http://localhost:5000";

// TODO: add skip button to create an initial about page
export class PickHandSeries extends React.Component {
  constructor(props: {}) {
    super(props);
    this.state = {
      handSeriesDataGrid: [],
    };
  }

  componentDidMount(): void {
    const limit = 100;
    fetch(baseUrl + `/api/upload?limit=${limit}`, {
      headers: { ContentType: "application/json" },
    }).then(async (response) => {
      const result = await response.json();
      if (result.errored) {
        message.error(result.message);
      } else {
        this.setState({ handSeriesDataGrid: result.handSeriesDataGrid });
      }
    });
  }

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
      </Box>
    );
  }
}
