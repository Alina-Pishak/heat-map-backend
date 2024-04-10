"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateHeatmap = void 0;
const canvas_1 = require("canvas");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
function generateHeatmap(data) {
    const width = 800;
    const height = 600;
    const canvas = (0, canvas_1.createCanvas)(width, height);
    const ctx = canvas.getContext("2d");
    const cellSize = 5;
    for (let y = 0; y < data.length; y++) {
        for (let x = 0; x < data[y].length; x++) {
            const color = getColor(data[y][x]);
            ctx.fillStyle = color;
            ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
        }
    }
    const mapPath = path_1.default.join("public/map", "heatmap.png");
    const out = fs_1.default.createWriteStream(mapPath);
    const stream = canvas.createPNGStream();
    stream.pipe(out);
    out.on("finish", () => {
        console.log("The PNG file was created.");
    });
    return mapPath;
}
exports.generateHeatmap = generateHeatmap;
function getColor(temperature) {
    let hue;
    if (temperature > 80) {
        hue = 0;
    }
    else if (temperature < 50) {
        hue = 240;
    }
    else {
        hue = 120;
    }
    return `hsl(${hue}, 100%, 50%)`;
}
//# sourceMappingURL=generateHeatmap.js.map