import React from 'react'
import styled from 'styled-components'
import { User } from '../../domain/model'

const Container = styled.div``

export const UserView = (props: { user: User; balance: number }) => {
    const user = props.user
    return (
        <Container>
            <h1>{user.username}</h1>
            <hr />
            <h4>{user.username}</h4>
            <h4>Email: {user.email}</h4>
            <h4>Numer telefonu: {user.phoneNumber}</h4>
            <h4>
                Do tej pory przekazano:{' '}
                {Math.round((user.moneySpend ?? 0) * 100) / 100}zł
            </h4>
            <h4>
                Wolne środki do przeznaczenia na wybrany cel:{' '}
                {Math.round(props.balance * 100) / 100}zł
            </h4>
        </Container>
    )
}
