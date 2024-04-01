"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
const Tcp_1 = require("./Tcp");
class App {
    constructor() {
        this.tcp = new Tcp_1.Tcp();
        if (!App.instance) {
            App.instance = this;
        }
        return App.instance;
    }
    async init() {
        const { tcp } = this;
        console.log("App started");
        await tcp.init();
        return true;
    }
}
exports.App = App;
//# sourceMappingURL=App.js.map