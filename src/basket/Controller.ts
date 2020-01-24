import express from "express"
import Basket from "./Basket"
import BasketItem from "./BasketItem"
import BasketRepository from "./Repository"

export default class BasketController {
	public router: express.Router = express.Router()
	private _path: string = "/baskets"
	private _repository: BasketRepository

	constructor() {
		this.initializeRoutes()
		this._repository = new BasketRepository()
	}

	public getBaskets(request: express.Request, response: express.Response): void  {
		response.json(this._repository.getBaskets())
	}

	public getBasket(request: express.Request, response: express.Response): void {
		const basket = this._repository.getBasket(request.params.id)
		basket ? response.json(basket) : response.status(404).json({message: "not found"})
	}

	public postBasket(request: express.Request, response: express.Response): void {
		const basket = Basket.fromJson(request.body)
		this._repository.addBasket(basket)
		response.json(basket)
	}

	public deleteBasket(request: express.Request, response: express.Response): void {
		const basketId: string = request.params.id
		response.json(this._repository.deleteBasket(basketId))
	}

	public putBasketItem(request: express.Request, response: express.Response): void {
		const basketItem: BasketItem = BasketItem.fromJson(request.body)
		const basketId: string = request.params.id
		try {
			response.json(this._repository.addItem(basketId, basketItem))
		} catch (e) {
			response.status(404).json({message: e.toString()})
		}
	}

	public updateQuanity(request: express.Request, response: express.Response): void {
		const basketItemQuanity: {quantity: number} = request.body
		const basketId: string = request.params.id
		const productId: string = request.params.productId
		try {
			response.json(this._repository.updateQuanity(basketId, productId, basketItemQuanity.quantity))
		} catch (e) {
			response.status(404).json({message: e.toString()})
		}
	}

	public deleteItem(request: express.Request, response: express.Response): void {
		const basketId: string = request.params.id
		const productId: string = request.params.productId
		try {
			response.json(this._repository.deleteItem(basketId, productId))
		} catch (e) {
			response.status(404).json({message: e.toString()})
		}
	}

	private initializeRoutes(): void {
		this.router.get(this._path, this.getBaskets.bind(this))
		this.router.post(this._path, this.postBasket.bind(this))
		this.router.get(`${this._path}/:id`, this.getBasket.bind(this))
		this.router.delete(`${this._path}/:id`, this.deleteBasket.bind(this))
		this.router.put(`${this._path}/:id/items`, this.putBasketItem.bind(this))
		this.router.put(`${this._path}/:id/items/:productId/quantity`, this.updateQuanity.bind(this))
		this.router.delete(`${this._path}/:id/items/:productId`, this.deleteItem.bind(this))
	}

}
