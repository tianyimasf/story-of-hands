"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const router = express_1.default.Router();
dotenv_1.default.config();
// Register
router.post("/tempRegister", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Our register logic starts here
    console.log("asdbyaaasdsawa");
    try {
        // Get user input
        console.log("trying to create a new user");
        const { username, email, password } = req.body;
        // Validate user input
        if (!username) {
            res.status(400).send("Need username");
        }
        // Encrypt user password
        const encryptedPassword = password
            ? yield bcryptjs_1.default.hash(password, 10)
            : undefined;
        let userJson = { username, token: "" };
        if (email) {
            userJson.email = email;
        }
        if (password) {
            userJson.password = encryptedPassword;
        }
        console.log(userJson);
        // Create user in our database
        // const user = await User.create(userJson);
        const user = userJson;
        // Create token
        const token = jsonwebtoken_1.default.sign({ user_name: user.username }, process.env.TOKEN_KEY, {
            expiresIn: "2h",
        });
        // save user token
        user.token = token;
        // await user.save();
        console.log(user);
        // return new user
        res.status(201).json(user);
    }
    catch (err) {
        console.log(err);
    }
    // Our register logic ends here
}));
const config = process.env;
function verifyToken(req, res, next) {
    const token = req.body.token || req.query.token || req.headers["x-access-token"];
    if (!token) {
        return res.status(403).send("A token is required for authentication");
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, config.TOKEN_KEY);
        req.user = decoded;
    }
    catch (err) {
        return res.status(401).send("Invalid Token");
    }
    return next();
}
exports.verifyToken = verifyToken;
exports.default = router;
