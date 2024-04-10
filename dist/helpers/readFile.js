"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.readFile = void 0;
const fs_1 = __importDefault(require("fs"));
const generateHeatmap_1 = require("./generateHeatmap");
const ApiError_1 = require("./ApiError");
async function readFile(filename) {
    try {
        const stream = fs_1.default.createReadStream(filename);
        const data = [];
        stream.on("data", (chunk) => {
            data.push(Uint8Array.from(chunk));
        });
        let filePath;
        stream.on("end", async () => {
            filePath = await (0, generateHeatmap_1.generateHeatmap)(data);
            fs_1.default.unlinkSync(filename);
        });
        return filePath;
    }
    catch (error) {
        return new ApiError_1.ApiError(500, {
            message: "Something went wrong. Try again later",
        });
    }
}
exports.readFile = readFile;
//# sourceMappingURL=readFile.js.map