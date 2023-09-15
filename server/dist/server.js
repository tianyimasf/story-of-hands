"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const tokenAuth_js_1 = __importDefault(require("./routes/tokenAuth.js"));
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const database_js_1 = require("./config/database.js");
dotenv_1.default.config();
(0, database_js_1.connect)();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use("/api/tokenAuth", tokenAuth_js_1.default);
const { API_PORT } = process.env;
const port = process.env.PORT || API_PORT;
// server listening
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
