import { JsonController, Post, UploadedFile, Res } from "routing-controllers";
import { Response } from "express";

import fs from "fs";
import path from "path";
import unzipper from "unzipper";

import { ApiError } from "../../../helpers/ApiError";
import { fileUploadOptions } from "../../middlewares/Upload";
import { readFile } from "../../../helpers/readFile";
@JsonController("/map")
export default class Map {
  @Post()
  async createMap(
    @UploadedFile("map", { options: fileUploadOptions })
    file: Express.Multer.File,
    @Res() res: Response
  ) {
    try {
      if (!file || file.mimetype !== "application/zip") {
        return new ApiError(400, {
          message: "File must be in zip archive format",
        });
      }

      const zipFilePath = path.join("public/zip");
      await fs
        .createReadStream(file.path)
        .pipe(unzipper.Extract({ path: zipFilePath }))
        .promise();
      fs.unlinkSync(file.path);
      let filename: string = "";
      const newFiles = await fs.promises.readdir(zipFilePath);
      for (let i = 0; i < newFiles.length; i += 1) {
        const fileExt = newFiles[i].split(".").pop();
        if (fileExt) {
          const filePath = path.join(zipFilePath, newFiles[i]);
          filename = readFile(filePath);
        }
      }
      return res.download(filename);
    } catch (error) {
      console.log(error);
      return new ApiError(500, { message: "Error processing ZIP file" });
    }
  }
}
