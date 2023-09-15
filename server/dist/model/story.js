"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Story = exports.storySchema = void 0;
const mongoose_1 = require("mongoose");
exports.storySchema = new mongoose_1.Schema({
    story: { type: String, required: true },
    authorToken: { type: String, required: true },
});
exports.Story = (0, mongoose_1.model)("Story", exports.storySchema);
