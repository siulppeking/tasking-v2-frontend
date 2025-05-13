import React, { useState } from 'react'
import { useEffect } from 'react';
import { Alert, Badge, Button, Card, Col, Container, Form, ListGroup, Nav, NavDropdown, Navbar, Row, Stack } from 'react-bootstrap';
import { BiDotsVerticalRounded, BiCheck, BiTime, BiHourglass, BiX, BiFileFind, BiArchive } from 'react-icons/bi';


const App = () => {

  const estados = {
    '01': {
      nombre: 'Pendiente',
      color: 'warning',
      icono: <BiArchive />
    },
    '02': {
      nombre: 'En espera',
      color: 'secondary',
      icono: <BiTime />
    },
    '03': {
      nombre: 'En progreso',
      color: 'primary',
      icono: <BiHourglass />
    },
    '04': {
      nombre: 'Revisión',
      color: 'info',
      icono: <BiFileFind />
    },
    '05': {
      nombre: 'Completado',
      color: 'success',
      icono: <BiCheck />
    },
    '06': {
      nombre: 'Cancelado',
      color: 'danger',
      icono: <BiX />
    },
  }

  const BASE_API = import.meta.env.VITE_BASE_API;

  const [proyectos, setProyectos] = useState([]);

  const obtenerTodo = async () => {
    const res = await fetch(BASE_API + '/proyectos');
    const data = await res.json();
    console.log(data);

    setProyectos(data)
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
          <Col lg={6}>
            <Form.Select aria-label="Default select example">
              <option value='01'>Pendiente</option>
              <option value='02'>En espera</option>
              <option value='03'>En progreso</option>
              <option value='04'>Revisión</option>
              <option value='05'>Completado</option>
              <option value='06'>Cancelado</option>
            </Form.Select>
          </Col>
        </Row>
        <Row className='mt-2'>
          {
            proyectos.map((proyecto) => (
              <Col key={proyecto.proyectoId} xl={3} lg={4} md={6} sm={12}>
                <Card style={{ cursor: 'pointer' }}
                  className='mb-2'
                  onClick={() => console.log(proyecto.proyectoId)}
                >
                  <Card.Body>
                    <Card.Title>{proyecto.titulo}</Card.Title>
                    {
                      proyecto.descripcion && <Card.Subtitle className="mb-2 text-muted">{proyecto.descripcion}</Card.Subtitle>
                    }
                    <Card.Text className='text-muted'>
                      <em>{proyecto.fechaRelativa}</em>
                    </Card.Text>
                    <Badge bg={estados[proyecto.estado].color}>{estados[proyecto.estado].nombre} {estados[proyecto.estado].icono}</Badge>
                  </Card.Body>
                  <BiDotsVerticalRounded className='position-absolute top-0 end-0' />
                </Card>
              </Col>
            ))
          }
        </Row>
      </Container>
    </>
  )
}

export default App