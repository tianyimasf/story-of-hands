import HorizontalImageList from "./HorizontalImageList";
import "./fonts.css";
import "./HandSeriesBasicInfo.css";
import { IHandSeries } from "./types";

export interface HandSeriesBasicInfo {
  handSeries: IHandSeries;
}

export interface HandSeriesBasicInfoProp {
  props: HandSeriesBasicInfo;
}

export default function HandSeriesBasicInfo({
  props,
}: HandSeriesBasicInfoProp) {
  return (
    <div>
      <HorizontalImageList
        props={{
          imageData: props.handSeries!.images.map((image) => image.data),
        }}
      ></HorizontalImageList>
      <p
        style={{
          color: "#96B6C5",
          paddingTop: "1vh",
          paddingLeft: "47vh",
          textAlign: "left",
          fontFamily: "Gloria Hallelujah",
          fontSize: "24px",
        }}
      >
        Arranger: {props.handSeries?.authorName}
      </p>
      <p
        style={{
          color: "#96B6C5",
          paddingTop: "1vh",
          paddingLeft: "47vh",
          textAlign: "left",
          fontFamily: "Gloria Hallelujah",
          fontSize: "24px",
        }}
      >
        Series Name:{" "}
        {props.handSeries?.name ?? "the arranger didn't give it a name😳"}
      </p>
      <p
        style={{
          color: "#96B6C5",
          paddingTop: "1vh",
          paddingLeft: "47vh",
          textAlign: "left",
          fontFamily: "Gloria Hallelujah",
          fontSize: "24px",
        }}
      >
        Series Description:{" "}
        {props.handSeries?.desc ??
          "the arranger didn't give it a description🙏"}
      </p>
    </div>
  );
}
