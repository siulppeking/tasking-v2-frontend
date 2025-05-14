import React, { useState } from 'react'
import { useEffect } from 'react';
import { Badge, Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
import { BiDotsVerticalRounded, BiCheck, BiTime, BiHourglass, BiX, BiFileFind, BiArchive,
  BiRightArrowAlt } from 'react-icons/bi';
import Loading from './components/Loading';
import NavbarPrivate from './components/NavbarPrivate';


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
  const [cargando, setCargando] = useState(false);

  const obtenerTodo = async () => {

    setCargando(true);
    const res = await fetch(BASE_API + '/proyectos');
    const data = await res.json();
    console.log(data);
    setProyectos(data);
    setCargando(false);
  }

  useEffect(() => {
    obtenerTodo();
  }, [])

  return (
    <>
      <NavbarPrivate />
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
        {
          cargando && <Loading />
        }
        {
          !cargando &&
          <Row className='mt-2'>
            {
              proyectos.map((proyecto) => (
                <Col key={proyecto.proyectoId} xl={3} lg={4} md={6} sm={12}>
                  <Card style={{ cursor: 'pointer' }}
                    className='shadow-lg mb-2'
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
        }

      </Container>
    </>
  )
}

export default App