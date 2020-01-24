import Basket from "./Basket"
import BasketItem from "./BasketItem"

export default class BasketRepository {
	private baskets: Basket[] = []

	public addBasket(basket: Basket): Error | null {
		if (!basket.id) {
			basket.setId()
		}
		this.baskets.push(basket)
		return null
	}

	public getBaskets(): Basket[] {
		return this.baskets
	}

	public getBasket(id: string): Basket | undefined {
		return this.baskets.find(basket => basket.id === id)
	}

	public deleteBasket(id: string): Basket[] {
		this.baskets = this.baskets.filter(bi => bi.id !== id)
		return this.baskets
	}

	public addItem(id: string, item: BasketItem): Basket {
		const basket = this.getBasket(id)
		if (!basket) { throw new Error("No basket") }
		basket?.addItem(item)
		return basket
	}

	public updateQuanity(id: string, productId: string, quanity: number): Basket {
		const basket = this.getBasket(id)
		if (!basket) { throw new Error("No basket") }
		const item = basket?.getItem(productId)
		if (!item) { throw new Error("No item") }
		item.updateQuanity(quanity)
		return basket
	}

	public deleteItem(id: string, productId: string): Basket {
		const basket = this.getBasket(id)
		if (!basket) { throw new Error("No basket") }
		return basket.removeItem(productId)

	}
}
