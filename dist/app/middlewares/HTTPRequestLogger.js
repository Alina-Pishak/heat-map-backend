"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HTTPRequestLogger = void 0;
const routing_controllers_1 = require("routing-controllers");
let HTTPRequestLogger = class HTTPRequestLogger {
    use(request, _response, next) {
        const { originalUrl, method, body } = request;
        console.log(`Received request: method=${method} path=${originalUrl}`, JSON.stringify(body));
        next();
    }
};
exports.HTTPRequestLogger = HTTPRequestLogger;
exports.HTTPRequestLogger = HTTPRequestLogger = __decorate([
    (0, routing_controllers_1.Middleware)({ type: "before" })
], HTTPRequestLogger);
//# sourceMappingURL=HTTPRequestLogger.js.map