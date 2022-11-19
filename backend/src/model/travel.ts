import { ObjectId } from 'mongodb'
import { Car } from './car'

export type Coordinates = [number, number]

export enum TravelParticipantType {
	PASSENGER = 1,
	DRIVER = 2,
	PASSENGER_OR_DRIVER = 3,
}

export type TravelParticipant = {
	userId: ObjectId
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

export interface Travel {
	title: string
	description: string

	from: Coordinates
	to: Coordinates
	via: Coordinates[]

	createdAt: Date
	departTime: Date
	departed: boolean

	owner: ObjectId
	confirmedBy: ObjectId | null
	confirmedAt: Date | null

	participants: TravelParticipant[]
	assignments: TravelAssignments | null

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
