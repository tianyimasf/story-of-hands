import { Schema, model } from "mongoose";
import mongoose from "mongoose";
import { IImage } from "./image.js";

export interface IHandSeries {
  name: string;
  desc: string;
  images: mongoose.Types.ObjectId[] | IImage[];
  authorToken: string;
  authorName: string;
  authorEmail?: string;
  story?: mongoose.Types.ObjectId[];
}

const handSeriesSchema = new Schema<IHandSeries>({
  name: { type: String },
  desc: { type: String },
  images: { type: [mongoose.Types.ObjectId], required: true },
  authorToken: { type: String, required: true },
  authorName: { type: String, required: true },
  authorEmail: { type: String },
  story: { type: [mongoose.Types.ObjectId] },
});

export const HandSeries = model<IHandSeries>("HandSeries", handSeriesSchema);
