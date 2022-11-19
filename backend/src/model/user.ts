import { ObjectId } from 'mongodb'
import { Car } from './car'

export interface User {
	_id: ObjectId
	
	username: string
	email: string
	password: string
	phoneNumber: string

	canConfirmTravel: boolean

	cars: Car[]
}
