import { ImageList, ImageListItem } from "@mui/material";
import "./fonts.css";

export interface HorizontalImageList {
  imageData: any[] | string[];
}

export interface HorizontalImageListProp {
  props: HorizontalImageList;
}

export default function HorizontalImageList({
  props,
}: HorizontalImageListProp) {
  return (
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
          {props.imageData.map((image, index) => (
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
  );
}
