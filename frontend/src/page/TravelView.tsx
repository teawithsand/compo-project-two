import React, { useEffect, useState } from 'react'
import { Loading } from '../components/Loading'
import { TravelView } from '../components/travel/TravelView'
import { travelApi } from '../domain/api'
import { Travel } from '../domain/model'
import { useTravelId } from '../domain/travelView'

export const TravelViewPage = () => {
    const id = useTravelId()

    const [travel, setTravels] = useState<null | Travel>(null)
    useEffect(() => {
        ;(async () => {
            setTravels(await travelApi.get(id))
        })()
    }, [id])

    if (!travel) {
        return <Loading />
    }

    return <TravelView travel={travel} />
}
