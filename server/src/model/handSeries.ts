import { Schema, model } from "mongoose";
import mongoose from "mongoose";

export interface IHandSeries {
  images: mongoose.Types.ObjectId[];
  authorToken: string;
  story?: mongoose.Types.ObjectId[];
}

const handSeriesSchema = new Schema<IHandSeries>({
  images: { type: [mongoose.Types.ObjectId], required: true },
  authorToken: { type: String, required: true },
  story: { type: [mongoose.Types.ObjectId] },
});

export const HandSeries = model<IHandSeries>("HandSeries", handSeriesSchema);
