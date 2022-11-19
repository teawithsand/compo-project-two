import express, { Express } from 'express'
import { authenticateTokenMw } from './auth'
import { userRouter } from './controller/user'

const app: Express = express()
const port = 3000

app.use(express.json())
app.use(authenticateTokenMw)
app.use(userRouter)

app.listen(port, () => {
	console.log(`⚡️[server]: Server is running at https://localhost:${port}`)
})
