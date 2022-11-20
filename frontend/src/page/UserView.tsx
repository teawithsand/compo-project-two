import React, { useEffect, useState } from 'react'
import { Loading } from '../components/Loading'
import { UserView } from '../components/travel/UserView'
import { useUser } from '../components/User'
import { UserSpend } from '../components/user/UserSpend'
import { travelApi, userApi } from '../domain/api'
import { assignTravel } from '../domain/assign'
import { Car, Travel, TravelParticipantType, User } from '../domain/model'
import { userUserId } from '../domain/travelView'

const carCost = (c: Car, distance: number) => {
    if (c.displacementCubicCentimeter > 900) {
        const m = 0.8358
        return distance * m
    } else {
        const m = 0.5214
        return distance * m
    }
}

export const UserViewPage = () => {
    const id = userUserId()

    const [users, setUsers] = useState<null | User[]>(null)
    useEffect(() => {
        ;(async () => {
            setUsers(await userApi.list())
        })()
    }, [])

    const [travels, setTravels] = useState<null | Travel[]>(null)
    useEffect(() => {
        ;(async () => {
            setTravels(await travelApi.list())
        })()
    }, [])

    const currentUser = useUser()
    const user = users?.find((u) => u._id === id)

    if (!user || !travels) {
        return <Loading />
    }

    let balance = 0
    for (const t of travels) {
        if (!t.participants.find((p) => p.userId === user._id)) continue
        const assignment = assignTravel(t)
        if (assignment.type !== 'success') continue
        if (t.participants.length <= 0) continue

        const costsMax = t.participants
            .map((p) => {
                if (
                    p.type === TravelParticipantType.DRIVER ||
                    p.type === TravelParticipantType.PASSENGER_OR_DRIVER
                ) {
                    return carCost(p.car, t.distanceKm)
                } else {
                    return 0
                }
            })
            .reduce((a, b) => a + b)

        const costsReal = assignment.assignment.cars
            .map((p) => carCost(p.car, t.distanceKm))
            .reduce((a, b) => a + b)

        balance += (costsMax - costsReal) / t.participants.length

        console.log('costs', {
            costsReal,
            costsMax,
            balanceDelta: (costsMax - costsReal) / t.participants.length,
        })
    }

    balance -= user.moneySpend ?? 0
    balance = Math.max(balance, 0)

    return (
        <>
            <UserView user={user} balance={balance} />
            {currentUser?._id === user._id ? (
                <UserSpend balance={balance} />
            ) : null}
        </>
    )
}
