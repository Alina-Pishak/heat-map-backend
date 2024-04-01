"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiError = void 0;
const routing_controllers_1 = require("routing-controllers");
class ApiError extends routing_controllers_1.HttpError {
    constructor(status = 500, error) {
        super(status);
        this.toJSON = () => {
            return this.error;
        };
        this.error = { ...error, status, code: error.code || "INTERNAL_ERROR" };
        this.name = "ApiError";
        this.message = error.message || "";
    }
}
exports.ApiError = ApiError;
//# sourceMappingURL=ApiError.js.map