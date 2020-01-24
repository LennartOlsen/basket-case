import uuidv4 from "uuid/v4"

export default class Model {
	public static fromJson<T>(this: new () => T, data: object): T {
		const t =  Object.assign(new this(), data)
		return t
	}

	public id: string = ""

	/**
	 * Sets model.id if and only if none is set
	 */
	public setId(): void {
		this.id = this.id ? this.id : uuidv4()
	}
}
