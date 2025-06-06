import React from 'react'
import { Button, Container, Form, Image, Nav, NavDropdown, Navbar } from 'react-bootstrap'
import svg from '../assets/taskingv2_logo.png';

const NavbarPrivate = () => {
    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container fluid>
                <Navbar.Brand href="#"> <Image src={svg} rounded width={32} style={{ paddingBottom: '5px' }} />TaskingV2</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav
                        className="me-auto my-2 my-lg-0"
                        navbarScroll
                    >
                        <Nav.Link href="#">Proyectos</Nav.Link>
                        <Nav.Link href="#">Cambiar Contraseña</Nav.Link>
                    </Nav>
                    <Form className="d-flex">
                        <Form.Control
                            type="search"
                            placeholder="Buscar..."
                            className="me-2"
                            aria-label="Search"
                        />
                        <Button variant="dark">Buscar</Button>
                    </Form>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default NavbarPrivate