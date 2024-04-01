import {
  JsonController,
  Post,
  UploadedFile,
  Res,
  Req,
} from "routing-controllers";
import fs from "fs";
import path from "path";
import unzipper from "unzipper";

import { ApiResponse } from "../../../helpers/ApiResponse";
import { ApiError } from "../../../helpers/ApiError";
import { fileUploadOptions } from "../../middlewares/Upload";

@JsonController("/map")
export default class Map {
  @Post()
  async createMap(
    @UploadedFile("map", { options: fileUploadOptions })
    file: Express.Multer.File
  ) {
    try {
      if (!file || file.mimetype !== "application/zip") {
        return new ApiError(400, {
          message: "File must be in zip archive format",
        });
      }

      const zipFilePath = path.join("public/zips", file.originalname);

      fs.renameSync(file.path, zipFilePath);

      const extractPath = path.join("public/maps");
      await fs
        .createReadStream(zipFilePath)
        .pipe(unzipper.Extract({ path: extractPath }))
        .promise();
      const files = await fs.promises.readdir(extractPath);
      const filePath = path.join(extractPath, files[0]);
      const data = await fs.promises.readFile(filePath);
      fs.unlinkSync(zipFilePath);
      fs.unlinkSync(filePath);
      return new ApiResponse(true, data, " ZIP file processed successfully");
    } catch (error) {
      return new ApiError(500, { message: "Error processing ZIP file" });
    }
  }
}
