"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const body_parser_1 = __importDefault(require("body-parser"));
const express_1 = __importDefault(require("express"));
const Controller_1 = __importDefault(require("./basket/Controller"));
const app = express_1.default();
const port = 3000;
const basketController = new Controller_1.default();
app.use(body_parser_1.default.json());
app.use("/", basketController.router);
// tslint:disable-next-line: no-console
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
exports.default = app;
//# sourceMappingURL=index.js.map