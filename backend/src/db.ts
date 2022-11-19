import { MongoClient } from 'mongodb'
import { Travel, User } from './model'

export const dbUrl = 'mongodb://user:user@mongodb:27017'

export const mongoClient = new MongoClient(dbUrl)
export const mongoDb = (() => {
	const db = mongoClient.db('travel')
	return {
		db,
		users: db.collection<User>('users'),
		travels: db.collection<Travel>('travels'),
	}
})()
