import React, { ReactNode, useEffect, useState } from 'react'
import { Table } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { userApi } from '../../domain/api'
import { assignTravel } from '../../domain/assign'
import { User, Travel } from '../../domain/model'
import { setUserId } from '../../domain/travelView'
import { Loading } from '../Loading'
import { useUser } from '../User'

const fCost = (c: number) => {
    return `${Math.round(c * 100) / 100}`
}

export const TravelAssignmentView = (props: { travel: Travel }) => {
    const { travel } = props
    const assignment = assignTravel(travel)
    const navigate = useNavigate()

    const user = useUser()

    const [users, setUsers] = useState<null | User[]>(null)
    useEffect(() => {
        ;(async () => {
            setUsers(await userApi.list())
        })()
    }, [])

    if (!users) return <Loading />

    if (assignment.type === 'failure') {
        return (
            <div>
                <h2>Nie można przypisać miejsc!</h2>
                Brakuje {assignment.seatsLacking} miejsc.
            </div>
        )
    }

    const cars = assignment.assignment.cars

    const distance = travel.distanceKm
    const costs = cars.map((c) => {
        if (c.car.displacementCubicCentimeter > 900) {
            const m = 0.8358
            return distance * m
        } else {
            const m = 0.5214
            return distance * m
        }
    })

    const sumCosts = costs.length === 0 ? 0 : costs.reduce((a, b) => a + b)

    const meCarIndex = cars.findIndex(
        (v) => v.driver === user?._id || v.passengers.includes(user?._id || '')
    )

    if (meCarIndex > 0 && meCarIndex !== 0 && cars.length > 1) {
        ;[cars[meCarIndex], cars[cars.length - 1]] = [
            cars[cars.length - 1],
            cars[meCarIndex],
        ]
    }

    const projects: Map<string, Set<string>> = new Map()

    for (const p of travel.participants) {
        const v = projects.get(p.project) || new Set()
        v.add(p.userId)
        projects.set(p.project, v)
    }

    const projectCost = (sz: number) =>
        (sumCosts / travel.participants.length) * sz

    if (!travel.participants.length) {
        return <h4>Brak uczestników</h4>
    }

    return (
        <div>
            <Table striped bordered hover>
                <thead>
                    <th>Lp</th>
                    <th>Kierowca</th>
                    <th>Pojazd</th>
                    <th>Pasażerowie</th>
                    <th>Koszt przejazdu</th>
                </thead>
                <tbody>
                    {cars.map((v, i) => {
                        const hasMe =
                            v.driver === user?._id ||
                            v.passengers.includes(user?._id || '')
                        const driverUser = users.find((u) => u._id === v.driver)
                        const driver =
                            users.find((u) => u._id === v.driver)?.username ||
                            'Użytkownik usunięty'
                        const passengers = v.passengers
                            .map((p) => users.find((u) => u._id === p))
                            .map((p) => p?.username)
                            .filter((v) => !!v)
                            .join(', ')

                        const makeBolder = (r: ReactNode) =>
                            hasMe ? <b>{r}</b> : r

                        return (
                            <tr>
                                <td>{makeBolder(<>{i + 1}</>)}</td>
                                <td>
                                    <a
                                        style={{
                                            cursor: 'pointer',
                                            textDecoration: 'underline',
                                            color: 'blue',
                                        }}
                                        onClick={() => {
                                            if (driverUser) {
                                                setUserId(driverUser._id)
                                                navigate('/user/view')
                                            }
                                        }}
                                    >
                                        {makeBolder(driver)}
                                    </a>
                                </td>
                                <td>
                                    {v.car.name}{' '}
                                    {v.car.displacementCubicCentimeter}cm
                                    <sup>3</sup>
                                </td>
                                <td>{makeBolder(passengers)}</td>
                                <td>{fCost(costs[i])}zł</td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>

            <Table striped bordered hover>
                <thead>
                    <th>Lp</th>
                    <th>Projekt</th>
                    <th>Liczba uczestników</th>
                    <th>Koszt</th>
                </thead>
                <tbody>
                    {[...projects.entries()].map(([k, v], i) => {
                        const hasMe = v.has(user?._id || '')

                        const makeBolder = (r: ReactNode) =>
                            hasMe ? <b>{r}</b> : r

                        return (
                            <tr>
                                <td>{makeBolder(<>{i + 1}</>)}</td>
                                <td>
                                    {makeBolder(<>{k || 'Brak projektu'}</>)}
                                </td>
                                <td>{makeBolder(<>{v.size}</>)}</td>
                                <td>
                                    {makeBolder(
                                        <>{fCost(projectCost(v.size))}zł</>
                                    )}
                                </td>
                            </tr>
                        )
                    })}
                    <tr>
                        <td>{projects.size}</td>
                        <td>Sumarycznie</td>
                        <td>{travel.participants.length}</td>
                        <td>{fCost(sumCosts)}zł</td>
                    </tr>
                </tbody>
            </Table>
        </div>
    )
}
