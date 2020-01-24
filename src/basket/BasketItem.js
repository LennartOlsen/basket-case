"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Model_1 = __importDefault(require("../framework/Model"));
class BasketItem extends Model_1.default {
    constructor() {
        super(...arguments);
        this.productId = "";
        this.quantity = 0;
    }
    updateQuanity(quantity) {
        this.quantity = quantity;
        return this.quantity;
    }
}
exports.default = BasketItem;
//# sourceMappingURL=BasketItem.js.map