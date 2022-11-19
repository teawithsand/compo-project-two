import React from 'react'
import styled from 'styled-components'
import {
    User
} from '../../domain/model'

const Container = styled.div``

export const UserView = (props: { user: User }) => {
    const user = props.user
    return (
        <Container>
            <h1>{user.username}</h1>
            <hr />
            <h3>Kontakt:</h3>
            <h4>{user.username}</h4>
            <h4>Email: {user.email}</h4>
            <h4>Numer telefonu: {user.phoneNumber}</h4>
        </Container>
    )
}
