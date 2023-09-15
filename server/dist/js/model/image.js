"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Image = exports.imageSchema = void 0;
const mongoose_1 = require("mongoose");
exports.imageSchema = new mongoose_1.Schema({
    name: String,
    image: {
        data: Buffer,
        contentType: String,
    },
});
exports.Image = (0, mongoose_1.model)("Image", exports.imageSchema);
