import React, { useState } from 'react'
import { useEffect } from 'react';
import { Badge, Button, Col, Container, Form, ListGroup, Nav, NavDropdown, Navbar, Row, Stack } from 'react-bootstrap';

const App = () => {

  const BASE_API = import.meta.env.VITE_BASE_API;

  const [estados, setEstados] = useState([])

  const obtenerTodo = async () => {
    const res = await fetch(BASE_API + '/api/estados');
    const data = await res.json();
    setEstados(data)
  }

  useEffect(() => {
    obtenerTodo();
  }, [])

  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container fluid>
          <Navbar.Brand href="#">Navbar scroll</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: '100px' }}
              navbarScroll
            >
              <Nav.Link href="#action1">Home</Nav.Link>
              <Nav.Link href="#action2">Link</Nav.Link>
              <NavDropdown title="Link" id="navbarScrollingDropdown">
                <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action4">
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action5">
                  Something else here
                </NavDropdown.Item>
              </NavDropdown>
              <Nav.Link href="#" disabled>
                Link
              </Nav.Link>
            </Nav>
            <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
              />
              <Button variant="dark">Search</Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container fluid>
        <Row>
          <Col>
            <Stack direction="horizontal" gap={2}>
              <Badge bg="primary">En Progreso</Badge>
              <Badge bg="success">Completada</Badge>
              <Badge bg="danger">Cancelada</Badge>
              <Badge bg="warning">
                Pendiente
              </Badge>
              <Badge bg="light" text="dark">
                Light
              </Badge>
              <Badge bg="dark">Dark</Badge>
            </Stack>
          </Col>
        </Row>
        <Row>
          <Col lg={6}>
            <Form.Select aria-label="Default select example">
              {
                estados.map(estado => {
                  return <option key={estado.estadoId} value={estado.estadoId}>{estado.nombre}</option>
                })
              }
            </Form.Select>
          </Col>
        </Row>
        <Row>
          <Col lg={6}>
            <ListGroup>
              <ListGroup.Item>Cras justo odio</ListGroup.Item>
              <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
              <ListGroup.Item>Morbi leo risus</ListGroup.Item>
              <ListGroup.Item>Porta ac consectetur ac</ListGroup.Item>
              <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
            </ListGroup>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default App