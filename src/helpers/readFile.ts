import fs from "fs";

import { generateHeatmap } from "./generateHeatmap";

export function readFile(filename: string) {
  const stream = fs.createReadStream(filename);
  const data: Uint8Array[] = [];

  stream.on("data", (chunk: Buffer) => {
    data.push(Uint8Array.from(chunk));
  });
  let filePath: string = "";
  stream.on("end", async () => {
    filePath = generateHeatmap(data);
    fs.unlinkSync(filename);
  });
  return filePath;
}
