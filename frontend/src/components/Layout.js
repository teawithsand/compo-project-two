import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useNavigate } from 'react-router-dom';
export default function Layout(){
    const navigate = useNavigate()
    return (
    <Navbar bg="light" expand="lg">
        <Container>
            <Navbar.Brand className = "asdf" onClick={() => navigate('/')} >Podróżnik 2.0</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <Nav.Link className = "asdf" onClick={() => navigate('/')} > Start </Nav.Link>
                    <Nav.Link className = "asdf" onClick={() => navigate('/form')} > Dodaj podróż </Nav.Link>
                    <Nav.Link className = "asdf" onClick={() => navigate('/profile')} > Mój profil </Nav.Link>
                    <Nav.Link className = "asdf" onClick={() => navigate('/history')} > Historia podróży</Nav.Link>
                    <Nav.Link className = "asdf" onClick={() => navigate('/ranks')} > Rankingi</Nav.Link>
                    <NavDropdown title="Ustawienia" id="basic-nav-dropdown">
                        <NavDropdown.Item href="#action/3.1">Ustawienia profilu</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.2">
                            Another action
                        </NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="#action/3.4">
                            Separated link
                        </NavDropdown.Item>
                    </NavDropdown>
                </Nav>
            </Navbar.Collapse>
        </Container>
    </Navbar>
    )
}