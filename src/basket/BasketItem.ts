import Model from "../framework/Model"

export default class BasketItem extends Model {
	public productId: string = ""
	public quantity: number = 0

	public updateQuanity(quantity: number): number {
		this.quantity = quantity
		return this.quantity
	}
}
