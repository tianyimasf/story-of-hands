import { Schema, model } from "mongoose";

export interface IImage {
  name: string;
  data: string;
  contentType: string;
}

export const imageSchema = new Schema<IImage>({
  name: String,
  data: String,
  contentType: String,
});

export const Image = model<IImage>("Image", imageSchema);
