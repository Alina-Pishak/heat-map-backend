import path from "path";
import multer from "multer";

const tempPath = path.join(__dirname, "../../temp");

export const fileUploadOptions = {
  storage: multer.diskStorage({
    destination: (req: any, file: any, cb: any) => {
      cb(null, tempPath);
    },
    filename: (req: any, file: any, cb: any) => {
      cb(null, file.originalname);
    },
  }),
};
