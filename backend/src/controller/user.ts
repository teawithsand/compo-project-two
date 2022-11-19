import { Router } from 'express'
import { ObjectId } from 'mongodb'
import { grantToken } from '../auth'
import { mongoDb } from '../db'
import { User } from '../model'
import { asyncHandler } from '../util'

export const userRouter = Router()

userRouter.post(
	'/api/user/login',
	asyncHandler(async (req, res) => {
		const username = req.body.username || ''
		const password = req.body.password || ''

		console.log('login', { username, password })
		const user = (await mongoDb.users.find().toArray()).find(
			(u) => u.username === username && u.password === password
		)

		if (user) {
			const token = grantToken(user._id.toString())
			res.send({ token })
		} else {
			res.sendStatus(403)
		}
	})
)

userRouter.post(
	'/api/user/register',
	asyncHandler(async (req, res) => {
		console.log(req.body)
		const username = req.body.username || ''
		const password = req.body.password || ''
		const email = req.body.email || ''
		const phoneNumber = req.body.phoneNumber || ''
		const isAdmin = !!req.body.isAdmin

		const u: User = {
			_id: new ObjectId(),

			username,
			password,
			canConfirmTravel: isAdmin,
			cars: [],
			email,
			phoneNumber,
		}
		console.log('Registering user', u)

		await mongoDb.users.insertOne(u)

		res.sendStatus(200)
	})
)
