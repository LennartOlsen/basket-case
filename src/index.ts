import bodyParser from "body-parser"
import express from "express"
import BasketController from "./basket/Controller"
const app = express()
const port = 3000
const basketController = new BasketController()

app.use(bodyParser.json())

app.use("/", basketController.router)

// tslint:disable-next-line: no-console
app.listen(port, () => console.log(`Example app listening on port ${port}!`))

export default app
