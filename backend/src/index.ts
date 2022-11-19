import express, { Express } from 'express'
import { makeCrudRouter } from './controller/crud'
import { mongoDb } from './db'

var cors = require('cors')

const app: Express = express()
const port = 3001

app.use(express.json())
app.use(cors())

app.use(makeCrudRouter('/api/user', mongoDb.users))
app.use(makeCrudRouter('/api/travel', mongoDb.travels))

app.listen(port, () => {
	console.log(`⚡️[server]: Server is running at https://localhost:${port}`)
})
