import React, { useEffect, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import styled from 'styled-components'
import { travelApi, userApi } from '../../domain/api'
import { assignTravel } from '../../domain/assign'
import {
    Travel,
    TravelParticipant,
    TravelParticipantType,
    User,
} from '../../domain/model'
import { Loading } from '../Loading'
import { NotLoggedIn } from '../NotLoggedIn'
import { useUser } from '../User'
import { TravelAssignmentView } from './TravelAssignmentView'
import { TravelDiscussionForm } from './TravelDiscussionForm'

const explainRole = (r: TravelParticipantType) => {
    if (r === TravelParticipantType.DRIVER) {
        return 'Kierowca'
    } else if (r === TravelParticipantType.PASSENGER) {
        return 'Pasażer'
    } else if (r === TravelParticipantType.PASSENGER_OR_DRIVER) {
        return 'Pasażer lub kierowca'
    }
}

const Container = styled.div``

export const TravelView = (props: { travel: Travel }) => {
    const travel = props.travel

    const [users, setUsers] = useState<null | User[]>(null)
    useEffect(() => {
        ;(async () => {
            setUsers(await userApi.list())
        })()
    }, [])

    const user = useUser()
    const userJoined = travel.participants.find((p) => p.userId === user?._id)
    const [joinAsWho, setJoinAsWho] = useState<TravelParticipantType>(
        TravelParticipantType.PASSENGER
    )

    const [inputProject, setInputProject] = useState('')
    if (!users) return <Loading />
    if (!user) return <NotLoggedIn />

    let bottom = null
    if (userJoined) {
        bottom = (
            <Button
                onClick={() => {
                    const p = async () => {
                        await travelApi.update({
                            ...travel,
                            participants: travel.participants.filter(
                                (p) => p.userId !== user._id
                            ),
                        })

                        window.location.reload()
                    }

                    p()
                }}
            >
                Wypisz się
            </Button>
        )
    } else {
        bottom = (
            <>
                <Form.Group>
                    <Form.Check
                        value="Kierowca"
                        type="radio"
                        label="Kierowca"
                        disabled={user.car == null}
                        onChange={() => {
                            if (user.car != null)
                                setJoinAsWho(TravelParticipantType.DRIVER)
                        }}
                        checked={joinAsWho === TravelParticipantType.DRIVER}
                    />
                    <Form.Check
                        value="Pasażer lub Kierowca"
                        type="radio"
                        label="Pasażer lub Kierowca"
                        disabled={user.car == null}
                        onChange={() => {
                            if (user.car != null)
                                setJoinAsWho(
                                    TravelParticipantType.PASSENGER_OR_DRIVER
                                )
                        }}
                        checked={
                            joinAsWho ===
                            TravelParticipantType.PASSENGER_OR_DRIVER
                        }
                    />
                    <Form.Check
                        value="Pasażer"
                        type="radio"
                        label="Pasażer"
                        onChange={() => {
                            setJoinAsWho(TravelParticipantType.PASSENGER)
                        }}
                        checked={joinAsWho === TravelParticipantType.PASSENGER}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Projekt(nazwa)</Form.Label>
                    <Form.Control
                        value={inputProject}
                        type="text"
                        disabled={user.car === null}
                        onChange={(e) => {
                            setInputProject(e.target.value)
                        }}
                        checked={joinAsWho === TravelParticipantType.DRIVER}
                    />
                </Form.Group>
                <Button
                    onClick={() => {
                        const p = async () => {
                            let newParticipant: TravelParticipant = {
                                type: TravelParticipantType.PASSENGER,
                                userId: user._id,
                                project: inputProject,
                            }
                            if (
                                joinAsWho === TravelParticipantType.DRIVER ||
                                joinAsWho ===
                                    TravelParticipantType.PASSENGER_OR_DRIVER
                            ) {
                                const car = user.car
                                if (!car) throw new Error('No car!')
                                newParticipant = {
                                    type: joinAsWho,
                                    car,
                                    userId: user._id,
                                    project: inputProject,
                                }
                            }
                            await travelApi.update({
                                ...travel,
                                participants: [
                                    ...travel.participants,
                                    newParticipant,
                                ],
                            })

                            window.location.reload()
                        }

                        p()
                    }}
                >
                    Zapisz się
                </Button>
            </>
        )
    }

    return (
        <Container>
            <h3>Z: {travel.from}</h3>
            <h3>Do: {travel.to}</h3>
            <h3>Dnia: {travel.departDate}</h3>
            <h3>Dystans: {travel.distanceKm}km</h3>
            <h3>
                {userJoined
                    ? 'Dołączyłeś już do tej podróży'
                    : 'Możesz dołączyć do tej podróży'}
            </h3>
            <p>{travel.description ? travel.description : 'Brak opisu'}</p>
            {bottom}
            <h3>Uczestnicy</h3>
            <ul>
                {travel.participants.map((v, i) => {
                    const listUser = users.find((u) => u._id === v.userId)
                    return (
                        <li key={i}>
                            {!listUser ? 'Konto usunięte' : listUser.username}{' '}
                            {listUser?._id === user._id ? '(Ty)' : null}{" - "}
                            {explainRole(v.type)}
                        </li>
                    )
                })}
            </ul>
            <hr />
            <TravelAssignmentView travel={travel} />
            <hr />
            <h3>Dyskusja</h3>
            <ul>
                {travel.discussion.map((v, i) => {
                    const listUser = users.find((u) => u._id === v.owner)
                    return (
                        <li key={i}>
                            <h6>
                                {!listUser
                                    ? 'Konto usunięte'
                                    : listUser.username}{' '}
                                o{' '}
                                {new Date(
                                    v.createdAtTimestamp
                                ).toLocaleString()}
                            </h6>
                            <span>{v.content}</span>
                        </li>
                    )
                })}
            </ul>
            <TravelDiscussionForm travel={travel} />
        </Container>
    )
}
