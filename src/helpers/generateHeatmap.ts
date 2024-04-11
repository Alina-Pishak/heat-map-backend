// import { createCanvas, loadImage } from "canvas";
// import fs from "fs";
// import path from "path";
// import { ApiError } from "./ApiError";

// export async function generateHeatmap(data: Uint8Array[]) {
//   try {
//     const width = 800;
//     const height = 600;

//     const canvas = createCanvas(width, height);
//     const ctx = canvas.getContext("2d");

//     const cellSize = 5;
//     for (let y = 0; y < data.length; y++) {
//       for (let x = 0; x < data[y].length; x++) {
//         const color = getColor(data[y][x]);
//         ctx.fillStyle = color;
//         ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
//       }
//     }
//     const mapPath = path.join("public/map", "heatmap.png");

//     const out = fs.createWriteStream(mapPath);
//     const stream = canvas.createPNGStream();
//     stream.pipe(out);
//     out.on("finish", () => {
//       console.log("The PNG file was created.");
//     });
//     return mapPath;
//   } catch (error) {
//     return new ApiError(500, {
//       message: "Something went wrong. Try again later",
//     });
//   }
// }
// function getColor(temperature: number) {
//   let hue: number;
//   if (temperature > 80) {
//     hue = 0;
//   } else if (temperature < 50) {
//     hue = 240;
//   } else {
//     hue = 120;
//   }

//   return `hsl(${hue}, 100%, 50%)`;
// }
