"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BasketRepository {
    constructor() {
        this.baskets = [];
    }
    addBasket(basket) {
        if (!basket.id) {
            basket.setId();
        }
        this.baskets.push(basket);
        return null;
    }
    getBaskets() {
        return this.baskets;
    }
    getBasket(id) {
        return this.baskets.find(basket => basket.id === id);
    }
    deleteBasket(id) {
        this.baskets = this.baskets.filter(bi => bi.id !== id);
        return this.baskets;
    }
    addItem(id, item) {
        var _a;
        const basket = this.getBasket(id);
        if (!basket) {
            throw new Error("No basket");
        }
        (_a = basket) === null || _a === void 0 ? void 0 : _a.addItem(item);
        return basket;
    }
    updateQuanity(id, productId, quanity) {
        var _a;
        const basket = this.getBasket(id);
        if (!basket) {
            throw new Error("No basket");
        }
        const item = (_a = basket) === null || _a === void 0 ? void 0 : _a.getItem(productId);
        if (!item) {
            throw new Error("No item");
        }
        item.updateQuanity(quanity);
        return basket;
    }
    deleteItem(id, productId) {
        const basket = this.getBasket(id);
        if (!basket) {
            throw new Error("No basket");
        }
        return basket.removeItem(productId);
    }
}
exports.default = BasketRepository;
//# sourceMappingURL=Repository.js.map