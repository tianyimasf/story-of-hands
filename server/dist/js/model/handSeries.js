"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const image_1 = require("./image");
const story_1 = require("./story");
const handSeriesSchema = new mongoose_1.Schema({
    images: { type: [image_1.imageSchema], required: true },
    authorToken: { type: String, required: true },
    story: { type: [story_1.storySchema], defualt: null },
});
module.exports = (0, mongoose_1.model)("HandSeries", handSeriesSchema);
