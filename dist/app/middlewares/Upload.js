"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fileUploadOptions = void 0;
const path_1 = __importDefault(require("path"));
const multer_1 = __importDefault(require("multer"));
const tempPath = path_1.default.join(__dirname, "../../temp");
exports.fileUploadOptions = {
    storage: multer_1.default.diskStorage({
        destination: (req, file, cb) => {
            cb(null, tempPath);
        },
        filename: (req, file, cb) => {
            cb(null, file.originalname);
        },
    }),
};
//# sourceMappingURL=Upload.js.map