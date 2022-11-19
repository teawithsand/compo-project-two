import React from 'react'
import { useNavigate } from 'react-router-dom'
import { NotLoggedIn } from '../components/NotLoggedIn'
import { TravelForm } from '../components/travel/TravelForm'
import { useUser } from '../components/User'
import { travelApi } from '../domain/api'
import {
    generateObjectId,
    Travel,
    TravelParticipantType,
} from '../domain/model'
import { setTravelId } from '../domain/travelView'

const emptyTravel: Travel = {
    _id: generateObjectId(),

    title: '',
    description: '',

    from: '',
    to: '',
    distanceKm: 0,

    createTimestamp: 0,
    departDate: '',

    participants: [],

    discussion: [],
}

export const TravelCreatePage = () => {
    const user = useUser()
    const navigate = useNavigate()
    if (!user) return <NotLoggedIn />

    return (
        <TravelForm
            baseData={emptyTravel}
            onSubmit={(t) => {
                ;(async () => {
                    t._id = generateObjectId()
                    await travelApi.create(t)
                    setTravelId(t._id)
                    navigate(`/travel/view`)
                })()
            }}
        />
    )
}
