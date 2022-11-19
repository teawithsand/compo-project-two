import React, { useEffect, useState } from 'react'
import { Alert } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { Loading } from '../components/Loading'
import { loginUser } from '../components/User'
import { LoginForm } from '../components/user/UserForm'
import { userApi } from '../domain/api'
import { User } from '../domain/model'

const lbd = {
    username: '',
    password: '',
}

export const LoginPage = () => {
    const [users, setUsers] = useState<null | User[]>(null)
    useEffect(() => {
        ;(async () => {
            setUsers(await userApi.list())
        })()
    }, [])

    const [alert, setAlert] = useState<string>('')
    const navigate = useNavigate()

    if (!users) {
        return <Loading />
    }

    return (
        <>
        {alert === "no-user" ? <Alert variant="danger">
            Nie ma takiego użytkownika
        </Alert> : null}
        <LoginForm
            baseData={lbd}
            onSubmit={(data) => {
                const u = users.find(
                    (u) =>
                        u.username === data.username &&
                        u.password === data.password
                )
                if (!u) {
                    setAlert('no-user')
                    return
                }
                loginUser(u)
                navigate('/')
            }}
        /></>
    )
}
