/// <reference types="mocha" />

import chai from "chai"
import * as request from "supertest"

import Basket from "../src/basket/Basket"
import BasketItem from "../src/basket/BasketItem"
import server from "../src/index"

describe("#http", () => {
	it("gets empty baskets", async () => {
		const result = await request.default(server).get("/baskets")
		chai.expect(result.body).is.empty
	})

	describe("/baskets", () => {
		const basket: Basket = new Basket()
		before( async () => {
			basket.customerId = "123566"
			basket.setId()
			await request.default(server).post("/baskets").send(basket)
		})

		it("adds baskets", async () => {
			const result = await request.default(server).get("/baskets")
			chai.expect(result.body[0].id).equal(basket.id)
		})

		it("gets basket", async () => {
			const result = await request.default(server).get(`/baskets/${basket.id}`)
			chai.expect(result.body.customerId).equal(basket.customerId)
		})

		it("does not get wrong basket", async () => {
			const result = await request.default(server).get(`/baskets/I DONT EXIST`)
			chai.expect(result.status).equal(404)
		})

		it("deletes basket", async () => {
			const b = new Basket()
			b.customerId = "123567"
			b.setId()
			await request.default(server).post("/baskets").send(b)

			const result = await request.default(server).delete(`/baskets/${b.id}`)
			chai.expect(result.body).length(1)
			chai.expect(result.body[0].id).equal(basket.id)
		})

		it("gets empty items", async () => {
			const result = await request.default(server).get(`/baskets/${basket.id}/items`)
			chai.expect(result.body).is.empty
		})

		describe("/items", () => {
			const basketItem: BasketItem = new BasketItem()

			before( async () => {
				basketItem.productId = "some-product"
				basketItem.quantity = 10
				await request.default(server).put(`/baskets/${basket.id}/items`).send(basketItem)
			})

			it("adds items", async () => {
				const result = await request.default(server).get(`/baskets/${basket.id}`)
				chai.expect(result.body.items[0].productId).equal(basketItem.productId)
			})

			it("updates quantity", async () => {
				await request
					.default(server)
					.put(`/baskets/${basket.id}/items/${basketItem.productId}/quantity`)
					.send({quantity: 22})
				const result = await request.default(server).get(`/baskets/${basket.id}`)
				console.log(result.body)
				chai.expect(result.body.items[0].quantity).equal(22)
			})

			it("gets error on no basket", async () => {
				const result = await request.default(server).get(`/baskets/I DONT EXIST/items`)
				chai.expect(result.status).equal(404)
			})
		})
	})
})
