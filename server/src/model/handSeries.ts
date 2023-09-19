import { Schema, model } from "mongoose";
import mongoose from "mongoose";
import { IImage } from "./image.js";
import { IStory, Story } from "./story.js";

export interface IHandSeries {
  name: string;
  desc: string;
  images: mongoose.Types.ObjectId[] | IImage[] | null[];
  authorToken: string;
  authorName: string;
  authorEmail?: string;
  stories?: mongoose.Types.ObjectId[] | IStory[];
}

const handSeriesSchema = new Schema<IHandSeries>({
  name: { type: String },
  desc: { type: String },
  images: { type: [mongoose.Types.ObjectId] || [Image], required: true },
  authorToken: { type: String, required: true },
  authorName: { type: String, required: true },
  authorEmail: { type: String },
  stories: { type: [mongoose.Types.ObjectId] || [Story] },
});

export const HandSeries = model<IHandSeries>("HandSeries", handSeriesSchema);
