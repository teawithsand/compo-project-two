import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Loading } from '../components/Loading'
import { RegisterForm } from '../components/user/RegisterForm'
import { userApi } from '../domain/api'
import { generateObjectId, User } from '../domain/model'

const lbd: User = {
    _id: generateObjectId(),
    car: null,
    email: '',
    phoneNumber: '',
    username: '',
    password: '',
}

export const RegisterPage = () => {
    const [users, setUsers] = useState<null | User[]>(null)
    useEffect(() => {
        ;(async () => {
            setUsers(await userApi.list())
        })()
    }, [])

    const navigate = useNavigate()

    if (!users) {
        return <Loading />
    }

    return (
        <>
            <RegisterForm
                baseData={lbd}
                onSubmit={(data) => {
                    const p = async () => {
                        data._id = generateObjectId()
                        await userApi.create(data)
                        navigate('/login')
                    }
                    p()
                }}
            />
        </>
    )
}
