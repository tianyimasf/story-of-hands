import { Schema, model } from "mongoose";

export interface IStory {
  story: string;
  authorToken: string;
}

export const storySchema = new Schema<IStory>({
  story: { type: String, required: true },
  authorToken: { type: String, required: true },
});

export const Story = model<IStory>("Story", storySchema);
