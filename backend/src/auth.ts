import { NextFunction, Request, Response } from 'express'
import * as jwt from 'jsonwebtoken'
import { ObjectId } from 'mongodb'
import { mongoDb } from './db'
import { asyncHandler } from './util'

export const jwtSecret =
	'b109d66bdc014b20d7cfc8f854564e49315ef3d493e76bc81cbf592d5f3a6cb045630d2da1b827c88394243db20cfc9dcf162f859fba831536a5ced268c5b40f'

export const grantToken = (id: string) => {
	return jwt.sign(
		{
			id,
		},
		jwtSecret,
		{ expiresIn: '999999s', algorithm: 'HS256' }
	)
}

export const authenticateTokenMw = asyncHandler(
	async (req: Request, res: Response, next: NextFunction) => {
		const authHeader = req.headers['authorization']
		const token = (authHeader && authHeader.split(' ')[1]) || null

		if (token === null) {
			next()
			return
		}

		try {
			let result = jwt.verify(token, jwtSecret, {
				algorithms: ['HS256'],
			})

			const user = await mongoDb.users.findOne({
				_id: new ObjectId((result as any).id),
			})

			if (!user) throw new Error('No user')
			;(req as any).user = user
		} catch (e) {
			console.log("Sth auth filed", e)
			res.sendStatus(403)
			return
		}

		next()
	}
)
