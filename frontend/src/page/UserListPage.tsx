import React, { useEffect, useState } from 'react'
import { Loading } from '../components/Loading'
import { userApi } from '../domain/api'
import { User } from '../domain/model'

export const UserListPage = () => {
    const [users, setUsers] = useState<null | User[]>(null)
    useEffect(() => {
        ;(async () => {
            setUsers(await userApi.list())
        })()
    }, [])

    if (!users) {
        return <Loading />
    }

    return (
        <pre>
            <code>{JSON.stringify(users, null, '\t')}</code>
        </pre>
    )
}
