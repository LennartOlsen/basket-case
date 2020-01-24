"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Model_1 = __importDefault(require("../framework/Model"));
class Basket extends Model_1.default {
    constructor() {
        super(...arguments);
        this.customerId = "";
        this.items = [];
    }
    addItem(item) {
        this.items.push(item);
        return this.items;
    }
    getItems() {
        return this.items;
    }
    getItem(productId) {
        return this.items.find(bi => bi.productId === productId);
    }
    removeItem(productId) {
        this.items = this.items.filter(bi => bi.productId !== productId);
        return this;
    }
}
exports.default = Basket;
//# sourceMappingURL=Basket.js.map