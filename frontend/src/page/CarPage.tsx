import React, { useMemo } from 'react'
import { Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { NotLoggedIn } from '../components/NotLoggedIn'
import { loginUser, useUser } from '../components/User'
import { CarForm } from '../components/user/CarForm'
import { userApi } from '../domain/api'
import { Car, User } from '../domain/model'

const zeroCar: Car = {
    name: '',
    displacementCubicCentimeter: 0,
    passengerSeats: 0,
    plateNumber: '',
}

export const CarPage = () => {
    const user = useUser()
    const navigate = useNavigate()
    const baseCar = useMemo(() => {
        return user?.car || zeroCar
    }, [user])

    if (!user) return <NotLoggedIn />

    return (
        <div>
            <Button
                onClick={() => {
                    const p = async () => {
                        const nu: User = {
                            ...user,
                            car: null,
                        }
                        userApi.update(nu)
                        loginUser(nu)
                        navigate('/')
                    }

                    p()
                }}
            >
                Usuń samochód
            </Button>
            <div className="mb-3"></div>
            <CarForm
                baseData={baseCar}
                onSubmit={(data) => {
                    const p = async () => {
                        const nu: User = {
                            ...user,
                            car: data,
                        }
                        userApi.update(nu)
                        loginUser(nu)
                        navigate('/')
                    }

                    p()
                }}
            />
        </div>
    )
}
