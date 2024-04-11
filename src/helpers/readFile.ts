import fs from "fs";

import { generateHeatmap } from "./generateHeatmap";
import { ApiError } from "./ApiError";

export async function readFile(filename: string) {
  try {
    const stream = fs.createReadStream(filename);
    const data: Uint8Array[] = [];

    stream.on("data", (chunk: Buffer) => {
      data.push(Uint8Array.from(chunk));
    });
    let filePath;
    stream.on("end", async () => {
      filePath = await generateHeatmap(data);
      fs.unlinkSync(filename);
    });
    return filePath;
  } catch (error) {
    return new ApiError(500, {
      message: "Something went wrong. Try again later",
    });
  }
}
