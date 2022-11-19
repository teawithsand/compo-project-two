import { Router } from 'express'
import { Collection, ObjectId } from 'mongodb'
import { mongoDb } from '../db'
import { assignTravel } from '../domain/assignTravel'
import { Travel, User } from '../model'
import { asyncHandler } from '../util'

export const travelRouter = Router()

travelRouter.get(
	'/api/travel',
	asyncHandler(async (req, res) => {
		const travels = await mongoDb.travels.find().toArray()
		res.send(travels)
	})
)

travelRouter.get(
	'/api/travel/:id',
	asyncHandler(async (req, res) => {
		const id = req.params.id || ''

		const travel = await (mongoDb.travels as any).findOne({
			_id: id,
		})
		res.send(travel)
	})
)

travelRouter.delete(
	'/api/travel/:id',
	asyncHandler(async (req, res) => {
		const id = req.params.id || ''

		;(mongoDb.travels as any).deleteOne({
			_id: id,
		})
	})
)

travelRouter.post(
	'/api/travel',
	asyncHandler(async (req, res) => {
		const user: User | undefined = (req as any).user
		if (!user) {
			res.sendStatus(401)
			return
		}

		const {
			title = '',
			description = '',
			tags = [],
			departTimestamp = null,
			to,
			from,
		} = req.body

		if (!to || !from || !title || !description || !departTimestamp) {
			res.sendStatus(422)
			return
		}

		const id = new ObjectId()
		await mongoDb.travels.insertOne({
			_id: id,
			title,
			description,
			tags,
			departTimestamp,
			createTimestamp: new Date().getTime(),
			to,
			from,
			via: [],
			owner: user._id,

			authorizedBy: null,
			authorizedAtTimestamp: null,

			departed: false,
			participants: [],

			assignments: null,
			discussion: [],
		})
	})
)

travelRouter.post(
	'/api/travel/:id/comment',
	asyncHandler(async (req, res) => {
		const { content } = req.body
		if (!content) {
			res.sendStatus(422)
			return
		}

		const user: User | undefined = (req as any).user
		if (!user) {
			res.sendStatus(401)
			return
		}

		const travel: Travel | null = await (mongoDb.travels as any).findOne({
			_id: req.params.id,
		})

		if (!travel) {
			res.sendStatus(404)
			return
		}

		travel.discussion.push({
			content,
			createdAtTimestamp: new Date().getTime(),
			lastEditedAtTimestamp: null,
			owner: user._id,
		})

		await (mongoDb.travels as any as Collection).replaceOne(
			{ _id: travel._id },
			travel
		)
	})
)

travelRouter.get(
	'/api/travel/:id/assign',
	asyncHandler(async (req, res) => {
		const user: User | undefined = (req as any).user
		if (!user) {
			res.sendStatus(401)
			return
		}

		const travel: Travel | null = await (mongoDb.travels as any).findOne({
			_id: req.params.id,
		})

		if (!travel) {
			res.sendStatus(404)
			return
		}

		if (travel.assignments !== null) {
			res.sendStatus(422)
			return
		}

		const data = travel.assignments || (await assignTravel(travel))

		res.send(data)
	})
)

travelRouter.post(
	'/api/travel/:id/assign',
	asyncHandler(async (req, res) => {
		const user: User | undefined = (req as any).user
		if (!user) {
			res.sendStatus(401)
			return
		}

		const travel: Travel | null = await (mongoDb.travels as any).findOne({
			_id: req.params.id,
		})

		if (!travel) {
			res.sendStatus(404)
			return
		}

		if (travel.assignments !== null) {
			res.sendStatus(422)
			return
		}

		const data = await assignTravel(travel)
		travel.assignments = data

		await (mongoDb.travels as any as Collection).replaceOne(
			{ _id: travel._id },
			travel
		)
	})
)

travelRouter.post(
	'/api/travel/:id/commit',
	asyncHandler(async (req, res) => {
		const user: User | undefined = (req as any).user
		if (!user) {
			res.sendStatus(401)
			return
		}

		const travel = await (mongoDb.travels as any).findOne({
			_id: req.params.id,
		})

		if (!travel) {
			res.sendStatus(404)
			return
		}
	})
)

travelRouter.post(
	'/api/travel/:id/decommit',
	asyncHandler(async (req, res) => {
		const user: User | undefined = (req as any).user
		if (!user) {
			res.sendStatus(401)
			return
		}

		const travel = await (mongoDb.travels as any).findOne({
			_id: req.params.id,
		})

		if (!travel) {
			res.sendStatus(404)
			return
		}
	})
)

travelRouter.post(
	'/api/travel/:id/authorize',
	asyncHandler(async (req, res) => {
		const user: User | undefined = (req as any).user
		if (!user || !user.canConfirmTravel) {
			res.sendStatus(401)
			return
		}

		const travel = await (mongoDb.travels as any).findOne({
			_id: req.params.id,
		})

		if (!travel) {
			res.sendStatus(404)
			return
		}

		travel.authorizedBy = user._id
		travel.authorizedAtTimestamp = new Date().getTime()

		await (mongoDb.travels as any as Collection).replaceOne(
			{ _id: travel._id },
			travel
		)
	})
)

travelRouter.post(
	'/api/travel/:id/unauthorize',
	asyncHandler(async (req, res) => {
		const user: User | undefined = (req as any).user
		if (!user || !user.canConfirmTravel) {
			res.sendStatus(401)
			return
		}

		const travel = await (mongoDb.travels as any).findOne({
			_id: req.params.id,
		})

		if (!travel) {
			res.sendStatus(404)
			return
		}

		travel.authorizedBy = null
		travel.authorizedAtTimestamp = null

		await (mongoDb.travels as any as Collection).replaceOne(
			{ _id: travel._id },
			travel
		)
	})
)
