"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Basket_1 = __importDefault(require("./Basket"));
const BasketItem_1 = __importDefault(require("./BasketItem"));
const Repository_1 = __importDefault(require("./Repository"));
class BasketController {
    constructor() {
        this.router = express_1.default.Router();
        this._path = "/baskets";
        this.initializeRoutes();
        this._repository = new Repository_1.default();
    }
    getBaskets(request, response) {
        response.json(this._repository.getBaskets());
    }
    getBasket(request, response) {
        const basket = this._repository.getBasket(request.params.id);
        basket ? response.json(basket) : response.status(404).json({ message: "not found" });
    }
    postBasket(request, response) {
        const basket = Basket_1.default.fromJson(request.body);
        this._repository.addBasket(basket);
        response.json(basket);
    }
    deleteBasket(request, response) {
        const basketId = request.params.id;
        response.json(this._repository.deleteBasket(basketId));
    }
    putBasketItem(request, response) {
        const basketItem = BasketItem_1.default.fromJson(request.body);
        const basketId = request.params.id;
        try {
            response.json(this._repository.addItem(basketId, basketItem));
        }
        catch (e) {
            response.status(404).json({ message: e.toString() });
        }
    }
    updateQuanity(request, response) {
        const basketItemQuanity = request.body;
        const basketId = request.params.id;
        const productId = request.params.productId;
        try {
            response.json(this._repository.updateQuanity(basketId, productId, basketItemQuanity.quantity));
        }
        catch (e) {
            response.status(404).json({ message: e.toString() });
        }
    }
    deleteItem(request, response) {
        const basketId = request.params.id;
        const productId = request.params.productId;
        try {
            response.json(this._repository.deleteItem(basketId, productId));
        }
        catch (e) {
            response.status(404).json({ message: e.toString() });
        }
    }
    initializeRoutes() {
        this.router.get(this._path, this.getBaskets.bind(this));
        this.router.post(this._path, this.postBasket.bind(this));
        this.router.get(`${this._path}/:id`, this.getBasket.bind(this));
        this.router.delete(`${this._path}/:id`, this.deleteBasket.bind(this));
        this.router.put(`${this._path}/:id/items`, this.putBasketItem.bind(this));
        this.router.put(`${this._path}/:id/items/:productId/quantity`, this.updateQuanity.bind(this));
        this.router.delete(`${this._path}/:id/items/:productId`, this.deleteItem.bind(this));
    }
}
exports.default = BasketController;
//# sourceMappingURL=Controller.js.map