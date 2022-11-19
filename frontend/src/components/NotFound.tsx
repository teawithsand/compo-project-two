import styled from 'styled-components'
import React from 'react'
import { Button } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

const Container = styled.div`
    margin-left: auto;
    margin-right: auto;
`

export const NotFound = () => {
    return (
        <Container>
            <LinkContainer to="/">
                <Button href="#">Nie znaleziono podanego zasobu</Button>
            </LinkContainer>
        </Container>
    )
}
