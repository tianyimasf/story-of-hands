import { Schema, model } from "mongoose";

export interface IUser {
  username: string;
  token: string;
  email?: string;
  password?: string;
}

const userSchema = new Schema<IUser>({
  username: { type: String },
  password: { type: String },
  token: { type: String },
});

const User = model<IUser>("User", userSchema);

User.collection.createIndex("email", {
  unique: true,
  partialFilterExpression: {
    email: {
      $type: "string",
    },
  },
});

export default User;
