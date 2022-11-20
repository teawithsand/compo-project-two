import {
    AssignedCar,
    Car,
    ObjectId,
    Travel,
    TravelAssignments,
    TravelParticipant,
    TravelParticipantType,
} from './model'

export const assignTravel = (
    travel: Travel
):
    | {
          type: 'success'
          assignment: TravelAssignments
      }
    | {
          type: 'failure'
          seatsLacking: number
      } => {
    console.log('Assigning', travel)
    let seats = 0
    const seatsRequired = travel.participants.length

    const cars: {
        car: Car
        owner: ObjectId
    }[] = []

    for (const p of travel.participants) {
        if (p.type === TravelParticipantType.DRIVER) {
            seats += p.car.passengerSeats + 1 // we add driver as seat, as it takes one person
            cars.push({
                car: p.car,
                owner: p.userId,
            })
        }
    }

    const podCandidates: (TravelParticipant & {
        type: TravelParticipantType.PASSENGER_OR_DRIVER
    })[] = []

    for (const p of travel.participants) {
        if (seats >= seatsRequired) break

        if (p.type === TravelParticipantType.PASSENGER_OR_DRIVER) {
            podCandidates.push(p)
        }
    }

    podCandidates.sort(
        (a, b) =>
            a.car.displacementCubicCentimeter -
            b.car.displacementCubicCentimeter
    )

    for (const p of podCandidates) {
        if (seats >= seatsRequired) break

        if (p.type === TravelParticipantType.PASSENGER_OR_DRIVER) {
            seats += p.car.passengerSeats + 1 // we add driver as seat, as it "takes" one person off queue

            cars.push({
                car: p.car,
                owner: p.userId,
            })
        }
    }

    if (seats < seatsRequired) {
        return {
            type: 'failure',
            seatsLacking: seatsRequired - seats,
        }
    }

    cars.sort((c1, c2) => {
        return (
            c1.car.displacementCubicCentimeter -
            c2.car.displacementCubicCentimeter
        )
    })

    const assignedCars: AssignedCar[] = []

    const driverIds = new Set<string>()

    for (const c of cars) {
        assignedCars.push({
            car: c.car,
            driver: c.owner,
            passengers: [], // no driver here
        })

        driverIds.add(c.owner.toString())
    }

    let lastCarIndex = 0
    for (const p of travel.participants) {
        if (
            p.type === TravelParticipantType.PASSENGER ||
            p.type === TravelParticipantType.PASSENGER_OR_DRIVER
        ) {
            if (driverIds.has(p.userId.toString())) continue

            while (
                assignedCars[lastCarIndex].passengers.length >=
                assignedCars[lastCarIndex].car.passengerSeats
            ) {
                lastCarIndex++
            }

            assignedCars[lastCarIndex].passengers.push(p.userId)
        }
    }

    return {
        type: 'success',
        assignment: {
            cars: assignedCars,
        },
    }
}
