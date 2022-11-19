import React, { useEffect, useState } from 'react'
import { Nav, Navbar as BsNavbar } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { User } from '../../domain/model'
import { getUser, loginUser } from '../User'

export const Navbar = () => {
    const [user, setUser] = useState<null | User>(null)
    useEffect(() => {
        setUser(getUser)
        const interval = setInterval(() => {
            setUser(getUser())
        }, 200)
        return () => {
            clearInterval(interval)
        }
    }, [])

    return (
        <BsNavbar bg="light" expand="lg">
            <LinkContainer to="/">
                <BsNavbar.Brand href="/">SZD</BsNavbar.Brand>
            </LinkContainer>
            <BsNavbar.Toggle />
            <BsNavbar.Collapse>
                <Nav className="me-auto">
                    <LinkContainer to="/travel/list">
                        <Nav.Link href="#">Lista/Wyszukiwanie podróży</Nav.Link>
                    </LinkContainer>
                    <LinkContainer to="/travel/create">
                        <Nav.Link href="#">Dodaj podróż</Nav.Link>
                    </LinkContainer>
                </Nav>
                <Nav>
                    {user ? (
                        <>
                            <Nav.Link
                                onClick={() => {
                                    loginUser(null)
                                    window.location.reload()
                                }}
                            >
                                Wyloguj się ({user.username})
                            </Nav.Link>
                            <LinkContainer to="/car">
                                <Nav.Link href="#">
                                    Zarządzaj samochodem
                                </Nav.Link>
                            </LinkContainer>
                        </>
                    ) : (
                        <>
                            <LinkContainer to="/login">
                                <Nav.Link href="#">Zaloguj się</Nav.Link>
                            </LinkContainer>
                            <LinkContainer to="/register">
                                <Nav.Link href="#">Zarejestruj się</Nav.Link>
                            </LinkContainer>
                        </>
                    )}
                </Nav>
            </BsNavbar.Collapse>
        </BsNavbar>
    )
}
