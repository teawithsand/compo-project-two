import React, { useEffect, useState } from 'react'
import { Loading } from '../components/Loading'
import { UserView } from '../components/travel/UserView'
import { userApi } from '../domain/api'
import { User } from '../domain/model'
import { userUserId } from '../domain/travelView'

export const UserViewPage = () => {
    const id = userUserId()

    const [users, setUsers] = useState<null | User[]>(null)
    useEffect(() => {
        ;(async () => {
            setUsers(await userApi.list())
        })()
    }, [])

    const user = users?.find((u) => u._id === id)

    if (!user) {
        return <Loading />
    }

    return <UserView user={user} />
}
