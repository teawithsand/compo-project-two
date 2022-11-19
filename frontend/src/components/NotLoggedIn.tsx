import styled from 'styled-components'
import React from 'react'
import { Button } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

const Container = styled.div`
    margin-left: auto;
    margin-right: auto;
`

export const NotLoggedIn = () => {
    return (
        <Container>
            <LinkContainer to="/login">
                <Button href="#">Aby to zrobić musisz się zalogować</Button>
            </LinkContainer>
        </Container>
    )
}
