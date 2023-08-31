import app from "./server.js"
import mongodb from "mongodb"
import dotenv from "dotenv"
import RestaurantsDAO from "./dao/restaurantsDAO.js"
import ReviewsDAO from "./dao/reviewsDAO.js"

dotenv.config()
const client = new mongodb.MongoClient(process.env.RESTREVIEWS_DB_URI)

const port = process.env.PORT || 8000

client.connect({
    poolSize: 50,
    wTimeout: 2500,
    useNewUrlParser: true,
}).catch(err => {
    console.log(err.stack)
    process.exit(1)
})

await RestaurantsDAO.injectDB(client)
await ReviewsDAO.injectDB(client)

app.listen(port, () => {
    console.log(`listening on port ${port}`)
})
