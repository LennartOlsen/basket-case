"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const v4_1 = __importDefault(require("uuid/v4"));
class Model {
    constructor() {
        this.id = "";
    }
    static fromJson(data) {
        const t = Object.assign(new this(), data);
        return t;
    }
    /**
     * Sets model.id if and only if none is set
     */
    setId() {
        this.id = this.id ? this.id : v4_1.default();
    }
}
exports.default = Model;
//# sourceMappingURL=Model.js.map