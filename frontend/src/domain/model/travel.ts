import { ObjectId } from '.'
import { Car } from './car'
import { Comment } from './discussion'

export type Coordinates = [number, number]

export enum TravelParticipantType {
	PASSENGER = 1,
	DRIVER = 2,
	PASSENGER_OR_DRIVER = 3,
}

export type TravelParticipant = {
	userId: ObjectId
	project: string
} & (
	| {
			type: TravelParticipantType.PASSENGER
	  }
	| {
			type: TravelParticipantType.DRIVER
			car: Car
	  }
	| {
			type: TravelParticipantType.PASSENGER_OR_DRIVER
			car: Car
	  }
)

export interface TravelDistanceData {
	distanceKm: number
	estimatedTime: number
}

export interface Foundation {
	_id: ObjectId
	name: string
	moneySpent: number
}

export interface Travel {
	_id: ObjectId

	title: string
	description: string

	from: string
	to: string
	distanceKm: number

	createTimestamp: number
	departDate: string
	
	participants: TravelParticipant[]
	discussion: Comment[]
}

export type AssignedCar = {
	car: Car
	driver: ObjectId
	passengers: ObjectId[]
}

export interface TravelAssignments {
	cars: AssignedCar[]
}
