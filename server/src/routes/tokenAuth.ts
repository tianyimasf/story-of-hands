import { IUser } from "../model/user.js";
import User from "../model/user.js";
import bcrypt from "bcryptjs";
import jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import express from "express";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, "./../../.env") });

export interface IUserAuthRequest extends Request {
  user: string | JwtPayload; // or any other type
}

// Register
router.post("/tempRegister", async (req: Request, res: Response) => {
  // Our register logic starts here
  try {
    // Get user input
    const { username, email, password } = req.body;

    // Validate user input
    if (!username) {
      res.status(400).json({ error: "Need username" });
    }

    // Encrypt user password
    const encryptedPassword = password
      ? await bcrypt.hash(password, 10)
      : undefined;

    let userJson: IUser = { username, token: "" };

    if (email) {
      userJson.email = email;
    }

    if (password) {
      userJson.password = encryptedPassword;
    }

    // Create user in our database
    const user = await User.create(userJson);

    // Create token
    const token = jwt.sign(
      { user_id: user._id.toHexString() },
      process.env.TOKEN_STRING!,
      {
        expiresIn: "2h",
      }
    );
    // save user token
    user.token = token;
    await user.save();

    // return new user
    res.status(201).json(user);
  } catch (err) {
    console.log(err);
  }
  // Our register logic ends here
});

const config = process.env;
export function verifyToken(
  req: IUserAuthRequest,
  res: Response,
  next: NextFunction
) {
  const token =
    req.body.token || req.query.token || req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }
  try {
    const decoded = jwt.verify(token, config.TOKEN_KEY!);
    req.user = decoded;
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
  return next();
}

export default router;
