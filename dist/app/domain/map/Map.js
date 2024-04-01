"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const routing_controllers_1 = require("routing-controllers");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const unzipper_1 = __importDefault(require("unzipper"));
const ApiResponse_1 = require("../../../helpers/ApiResponse");
const ApiError_1 = require("../../../helpers/ApiError");
const Upload_1 = require("../../middlewares/Upload");
let Map = class Map {
    async createMap(file) {
        try {
            if (!file || file.mimetype !== "application/zip") {
                return new ApiError_1.ApiError(400, {
                    message: "File must be in zip archive format",
                });
            }
            const zipFilePath = path_1.default.join("public/zips", file.originalname);
            fs_1.default.renameSync(file.path, zipFilePath);
            const extractPath = path_1.default.join("public/maps");
            await fs_1.default
                .createReadStream(zipFilePath)
                .pipe(unzipper_1.default.Extract({ path: extractPath }))
                .promise();
            const files = await fs_1.default.promises.readdir(extractPath);
            const filePath = path_1.default.join(extractPath, files[0]);
            const data = await fs_1.default.promises.readFile(filePath);
            fs_1.default.unlinkSync(zipFilePath);
            fs_1.default.unlinkSync(filePath);
            return new ApiResponse_1.ApiResponse(true, data, " ZIP file processed successfully");
        }
        catch (error) {
            return new ApiError_1.ApiError(500, { message: "Error processing ZIP file" });
        }
    }
};
__decorate([
    (0, routing_controllers_1.Post)(),
    __param(0, (0, routing_controllers_1.UploadedFile)("map", { options: Upload_1.fileUploadOptions })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], Map.prototype, "createMap", null);
Map = __decorate([
    (0, routing_controllers_1.JsonController)("/map")
], Map);
exports.default = Map;
//# sourceMappingURL=Map.js.map