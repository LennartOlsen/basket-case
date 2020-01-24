import Model from "../framework/Model"
import BasketItem from "./BasketItem"

export default class Basket extends Model {
	public customerId: string = ""
	public items: BasketItem[] = []
	public addItem(item: BasketItem): BasketItem[] {
		this.items.push(item)
		return this.items
	}
	public getItems(): BasketItem[] {
		return this.items
	}
	public getItem(productId: string): BasketItem | undefined {
		return this.items.find(bi => bi.productId === productId)
	}
	public removeItem(productId: string): Basket {
		this.items = this.items.filter(bi => bi.productId !== productId)
		return this
	}
}
