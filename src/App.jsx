import React, { useState } from 'react'
import { useEffect } from 'react';
import { Badge, Card, Col, Container, Form, InputGroup, Row } from 'react-bootstrap';
import {
  BiDotsVerticalRounded,
  BiCheck,
  BiTime,
  BiHourglass,
  BiX,
  BiSearchAlt2,
  BiError
} from 'react-icons/bi';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar, Line } from 'react-chartjs-2';

import Loading from './components/Loading';
import NavbarPrivate from './components/NavbarPrivate';

// Registrar los componentes de ChartJS
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const labels = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo'];

// Datos del gráfico
const barData = {
  labels,
  datasets: [
    {
      label: 'Proyectos Completados',
      data: [5, 8, 4, 6, 7],
      backgroundColor: 'rgba(54, 162, 235, 0.6)',
      borderRadius: 5,
    },
  ],
};

const lineData = {
  labels,
  datasets: [
    {
      label: 'Tasa de Avance (%)',
      data: [70, 80, 60, 90, 85],
      borderColor: 'rgba(255, 99, 132, 1)',
      backgroundColor: 'rgba(255, 99, 132, 0.2)',
      tension: 0.4,
      fill: true,
    },
  ],
};

// Opciones del gráfico
const options = {
  responsive: true,
  plugins: {
    legend: { position: 'top' },
    title: {
      display: true,
      text: 'Proyectos Completados por Mes'
    }
  }
};

const App = () => {

  const estados = {
    '01': {
      nombre: 'Pendiente',
      color: 'warning',
      icono: <BiError />
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
      icono: <BiSearchAlt2 />
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
  const [filtro, setFiltro] = useState("");


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
  }, []);

  // Filtro aplicado en tiempo real
  const proyectosFiltrados = proyectos.filter((proyecto) => {
    const texto = filtro.toLowerCase();
    const titulo = proyecto.titulo?.toLowerCase() || "";
    const descripcion = proyecto.descripcion?.toLowerCase() || "";
    return titulo.includes(texto) || descripcion.includes(texto);
  });

  return (
    <>
      <NavbarPrivate />
      <Container fluid>
        <Row style={{ display: 'none' }}>
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
        <Row className='mt-3'>
          <Col lg={6} sm={12}>
            <Card className='shadow-lg mb-2'>
              <Card.Body>
                <Bar data={barData} options={options} />
              </Card.Body>
            </Card>
          </Col>
          <Col lg={6} sm={12}>
            <Card className='shadow-lg mb-2'>
              <Card.Body>
                <Line data={lineData} options={options} />
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row className='mt-3'>
          <Col xl={{ span: 4, offset: 4 }} lg={{ span: 4, offset: 4 }} md={{ span: 6, offset: 3 }} sm={12}>
            <InputGroup className="">
              <InputGroup.Text id="basic-addon1"><BiSearchAlt2 /></InputGroup.Text>
              <Form.Control
                placeholder="Filtro de Busqueda..."
                aria-label="Username"
                value={filtro}
                onChange={(e) => setFiltro(e.target.value)}
              />
            </InputGroup>
          </Col>
        </Row>
        {
          cargando && <Loading />
        }
        {
          !cargando &&
          <Row className='mt-3'>
            {
              proyectosFiltrados.map((proyecto) => (
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