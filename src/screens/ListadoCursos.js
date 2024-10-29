import React, { useEffect, useState } from "react";
import Fondo from "../components/FondoB";
import Navbar from "../components/NavbarHorizontal";
import Agregar from "../components/BotonAgregar";
import ModalChico from "../components/ModalChico"; 
import ModalMediano from "../components/ModalMediano"; 
import ModalGrande from "../components/ModalGrande"; 
import "./Styles/ListadoCursos.css";
import "./general.css";
import construccion from '../assets/contruccion.png'; 
import colors from "../constants/colors";
import { useNavigate } from 'react-router-dom';
import CursoCard from "../components/CursoCard";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const API_URL = 'http://149.50.140.55:8081';

function ListadoCursos() {
    // const [usuario, setUsuario] = useState(null);
    const [cursos, setCursos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [cursoSeleccionado, setCursoSeleccionado] = useState(null);

    //Valores del formulario de alta
    const [anio, setAnio] = useState('');
    const [division, setDivision] = useState('');
    const [cicloLectivo, setCicloLectivo] = useState('');
    const [idDocente, setIdDocente] = useState(null);

    const navigate = useNavigate();

    const handleAlumnos = (e, idCurso) => {
      e.preventDefault();
      navigate(`/gestionalumnos/curso/${idCurso}`)
    };

    const [popupEditar, setPopupEditar] = useState(false);    
    const editar = (curso) => {
      setCursoSeleccionado(curso);
      setAnio(curso.level);
      setDivision(curso.division);
      setCicloLectivo(curso.academicYear);
      setPopupEditar(true); 
    };
    const cancelarEditar = () => { setPopupEditar(false); };

    const [popupEliminar, setPopupEliminar] = useState(false);    
    const eliminar = (idCurso) => {
      setCursoSeleccionado(idCurso); 
      setPopupEliminar(true); 
    };
    const cancelarEliminar = () => { setPopupEliminar(false); };

    const [popupAgregar, setPopupAgregar] = useState(false);    
    const agregar = () => { setPopupAgregar(true); };
    const cancelarAgregar = () => { setPopupAgregar(false); };

    const [popupAlumnos, setPopupAlumnos] = useState(false);    
    const listaAlumnos = () => { 
        setPopupAgregar(false);
        setPopupAlumnos(true);
    };

    const cancelarAlumnos = () => { setPopupAlumnos(false); };

    //Recuperar token
    const token = localStorage.getItem('token');

    //Decodificar token
    useEffect(() => {
      if (token) {
        const decoded = jwtDecode(token);
        setIdDocente(decoded.sub);
      } else {
        console.log('Error decodificando el token');
      }
    }, [])

    //Petición para obtener cursos
    const getCursos = async () => {
      try {
        const response = await axios.get(`${API_URL}/course/get-all`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setCursos(response.data);
        setLoading(false);
      } catch (error) {
        setError('Error al cargar los cursos');
        setLoading(false);
      }
    };

    useEffect(() => {
      getCursos();
    }, []);

    //Petición para alta de Curso
    const altaCurso = async (e) => {
      e.preventDefault();
      const cursoData = {
        academicYear: cicloLectivo,
        division: division,
        level: anio,
        teacherId: idDocente
      };

      try {
        const response = await axios.post(`${API_URL}/course/add`, cursoData, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        console.log('Curso creado: ', response.data);
        getCursos();
        cancelarAgregar();
      } catch (error) {
        console.log('Error al crear el curso: ', error);
      }
    };

    //Petición para modificar un curso
    const editarCurso = async (e) => {
      e.preventDefault();

      const cursoData = {
        academicYear: cicloLectivo,
        division: division,
        level: anio,
        teacherId: idDocente
      };

      try {
        const response = await axios.put(`${API_URL}/course/update?id=${cursoSeleccionado.id}`, cursoData, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        console.log('Curso actualizado: ', response.data);
        getCursos();
        cancelarEditar();
      } catch (error) {
        console.error('Error al actualizar el curso: ', error);
      }
    }

    //Eliminar curso
    const eliminarCurso = async (idCurso) => {
      try {
        const response = await axios.delete(`${API_URL}/course/delete?id=${idCurso}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        console.log('Curso eliminado: ', response.data);

        getCursos();
        cancelarEliminar();
      } catch (error) {
        console.log('Error al eliminar el curso: ', error);
      }
    };

    return (
        <Fondo>
            <header>
                <Navbar/>
            </header>
            <body className="listadoCursos">
                <h1 className="titulo">Listado de cursos</h1>
                <div className="contenido">
                    <p id="cicloLectivo">Ciclo lectivo 2024</p>
                    <div className="listaCursos">
                      {loading ? <p>Cargando cursos</p> : <p> </p>}
                      {cursos.map((curso) => (
                        <CursoCard
                          key={curso.id}
                          añoDivision={`${curso.level ? curso.level.slice(-1) : ''}°${curso.division}`}
                          handleVerCurso={(e) => handleAlumnos(e, curso.id)}
                          handleEditar={() => editar(curso)}
                          handleEliminar={() => eliminar(curso.id)}
                        />
                      ))}
                    </div>
                    <Agregar onClick={agregar}/>
                </div>
            </body>
            {popupEliminar && (
              <ModalChico 
                titulo="Dar de baja un curso"
                cerrar={cancelarEliminar} 
                colorFondo={colors.rojo}
                aceptar={() => eliminarCurso(cursoSeleccionado)}
              >
                <div className="bodyModal">
                    <p>
                      ¿Está seguro que desea dar de baja este curso?
                      </p>
                </div>
              </ModalChico>
            )}
            {popupEditar && (
              <ModalMediano 
                titulo="Editar un curso"
                cerrar={cancelarEditar} 
                colorFondo={colors.celesteOscuro}
                aceptar={editarCurso}
            >
            <div className="bodyModal">
                  <div id="headCurso" className="introduccion">
                    <p>
                      Está modificando los datos del curso:
                      <b> {cursoSeleccionado && cursoSeleccionado.level ? `${cursoSeleccionado.level.slice(-1)}° ${cursoSeleccionado.division}` : ''}</b>
                    </p>
                  </div>
                  <form id="formCurso" onSubmit={editarCurso}>
                    <div className="input">
                      <label>Año</label>
                      <select value={anio} onChange={(e) => setAnio(e.target.value)}>
                        <option value="" disabled>Seleccione</option>
                        <option value="LEVEL_1">Nivel 1</option>
                        <option value="LEVEL_2">Nivel 2</option>
                        <option value="LEVEL_3">Nivel 3</option>
                      </select>
                    </div>
                    <div className="input">
                      <label>División</label>
                      <select value={division} onChange={(e) => setDivision(e.target.value)}>
                        <option value="" disabled>Seleccione</option>
                        <option value="A">A</option>
                        <option value="B">B</option>
                        <option value="C">C</option>
                        <option value="D">D</option>
                      </select>
                    </div>
                    <div className="input">
                      <label>Ciclo Lectivo</label>
                      <select value={cicloLectivo} onChange={(e) => setCicloLectivo(e.target.value)}>
                        <option value="" disabled >Seleccione</option>
                        <option value="2024" selected>2024</option>
                      </select>
                    </div>
                  </form>
                </div>
              </ModalMediano>
            )}
            {popupAlumnos && (
              <ModalGrande 
                titulo="Curso nuevo: Lista de alumnos"
                cerrar={cancelarAlumnos} 
                colorFondo={colors.verde}
              >
                <div className="bodyModal">
                    <h1>En construcción</h1>
                    <img id="contruccion" src={construccion} alt="contruccion" />
                </div>
              </ModalGrande>
            )}
            {popupAgregar && (
              <ModalMediano 
                titulo="Agregar un curso nuevo"
                cerrar={cancelarAgregar} 
                colorFondo={colors.violeta}
                aceptar={altaCurso}
              >
                <div className="bodyModal">
                  <div id="headCurso" className="introduccion">
                    <p>Para agregar un curso complete los siguientes datos:</p>
                  </div>
                  <form id="formCurso">
                    <div className="input">
                      <label>Año</label>
                      <select value={anio} onChange={(e) => setAnio(e.target.value)}>
                        <option value="" disabled selected>Seleccione</option>
                        <option value="LEVEL_1">Nivel 1</option>
                        <option value="LEVEL_2">Nivel 2</option>
                        <option value="LEVEL_3">Nivel 3</option>
                      </select>
                    </div>
                    <div className="input">
                      <label>División</label>
                      <select value={division} onChange={(e) => setDivision(e.target.value)}>
                        <option value="" disabled selected>Seleccione</option>
                        <option value="A">A</option>
                        <option value="B">B</option>
                        <option value="C">C</option>
                        <option value="D">D</option>
                      </select>
                    </div>
                    <div className="input">
                      <label>Ciclo Lectivo</label>
                      <select value={cicloLectivo} onChange={(e) => setCicloLectivo(e.target.value)}>
                        <option value="" disabled selected>Seleccione</option>
                        <option value="2024">2024</option>
                      </select>
                    </div>
                  </form>
                </div>
              </ModalMediano>
            )}
        </Fondo>
    );
}

export default ListadoCursos;
