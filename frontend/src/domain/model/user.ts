import { ObjectId } from '.'
import { Car } from './car'

export interface User {
	_id: ObjectId
	
	username: string
	email: string
	password: string
	phoneNumber: string

	car: Car | null
}
