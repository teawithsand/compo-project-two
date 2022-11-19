import { Car } from './car'

export interface User {
	username: string
	email: string
	password: string
	phoneNumber: string

	canConfirmTravel: boolean

	cars: Car[]
}
