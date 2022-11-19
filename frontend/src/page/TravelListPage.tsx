import React, { useEffect, useState } from 'react'
import { Loading } from '../components/Loading'
import { TravelList } from '../components/travel/TravelList'
import { travelApi } from '../domain/api'
import { Travel } from '../domain/model'

export const TravelListPage = () => {
    const [travels, setTravels] = useState<null | Travel[]>(null)
    useEffect(() => {
        ;(async () => {
            setTravels(await travelApi.list())
        })()
    }, [])

    if (!travels) {
        return <Loading />
    }

    return <TravelList travels={travels} />
}
