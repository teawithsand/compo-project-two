import { Router } from 'express'
import { Collection } from 'mongodb'
import { asyncHandler } from '../util'

export const makeCrudRouter = <T extends {}>(
	path: string,
	c: Collection<T>
) => {
	const crud = Router()

	crud.delete(
		path + '/set',
		asyncHandler(async (req, res) => {
			await c.deleteMany({})
		})
	)

	crud.post(
		path + '/set',
		asyncHandler(async (req, res) => {
			await c.deleteMany({})
			await c.insertMany(req.body)

			console.log('Deleting all + inserting', req.body)
			res.sendStatus(200)
		})
	)

	crud.post(
		path,
		asyncHandler(async (req, res) => {
			await c.replaceOne({ _id: req.body._id }, req.body, {
				upsert: true,
			})
			res.sendStatus(200)
		})
	)

	crud.get(
		path,
		asyncHandler(async (req, res) => {
			const data = await c.find().toArray()
			console.log('Listing data', data)
			res.send(data)
		})
	)

	crud.get(
		path + '/:id',
		asyncHandler(async (req, res) => {
			const data =
				(await c.findOne({
					_id: req.params.id,
				} as any)) || null
			res.send(data)
		})
	)

	crud.delete(
		path + '/:id',
		asyncHandler(async (req, res) => {
			const data = await c.deleteOne({
				_id: req.params.id as any as string,
			} as any)

			res.send({
				deleted: data.deletedCount,
			})
		})
	)

	return crud
}
