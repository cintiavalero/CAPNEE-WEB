import React, { useState, useEffect } from "react";
import Fondo from "../components/FondoB";
import Navbar from "../components/NavbarVertical";
import Agregar from "../components/BotonAgregar";
import "./general.css";
import "./Styles/GestionAlumnos.css";
import ModalChico from "../components/ModalChico"; 
import ModalMediano from "../components/ModalMediano";
import AlumnoCard from "../components/AlumnoCard";
import colors from "../constants/colors";
import { useNavigate, useParams } from 'react-router-dom';
import axios from "axios";

const API_URL = 'http://149.50.140.55:8081';

function GestionAlumnos() {
    const [alumnos, setAlumnos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    //Recuperar id de curso
    const { idCurso } = useParams();

    //Valores del formulario de alta
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [nombreUsuario, setNombreUsuario] = useState('');
    const [contrasena, setContrasena] = useState('');
    const [dni, setDni] = useState('');
    const [fechanacimiento, setFechanacimiento] = useState('');
    const [errors, setErrors] = useState({});


    //Navegar al perfil de un alumno
    const navigate = useNavigate();

    const verPerfil = (e) => {
      e.preventDefault();
      navigate('/perfil');
    }

    const [popupEditar, setPopupEditar] = useState(false);    
    const editar = (alumno) => {
      setAlumnoSeleccionado(alumno); 
      setPopupEditar(true); 
    };
    const cancelarEditar = () => {
      setAlumnoSeleccionado(''); 
      setPopupEditar(false); 
    };

    const [popupEliminar, setPopupEliminar] = useState(false);
    const [alumnoSeleccionado, setAlumnoSeleccionado] = useState('');    
    const eliminar = (alumno) => { 
      setAlumnoSeleccionado(alumno);
      setPopupEliminar(true); 
    };
    const cancelarEliminar = () => {
      setAlumnoSeleccionado(''); 
      setPopupEliminar(false); 
    };

    const [popupAgregar, setPopupAgregar] = useState(false);    
    const agregar = () => { setPopupAgregar(true); };
    const cancelarAgregar = () => { setPopupAgregar(false); };
    
    //Recuperar token
    const token = localStorage.getItem('token');

    //Petición para obtener alumnos asociados a un curso
    const getAlumnos = async () => {
      try {
        const response = await axios.get(`${API_URL}/course/get-students-from-course?id=${idCurso}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setAlumnos(response.data.students);
        setLoading(false);
      } catch (error) {
        setError('Error al cargar los alumnos');
        setLoading(false);
      }
    };

    useEffect(() => {
      getAlumnos();
    }, []);

    //Validar los campos
    const validarCampos = () => {
      const newErrors = {}
      if (!nombre.trim()) newErrors.nombre = "El nombre es obligatorio";
      if (!apellido.trim()) newErrors.apellido = "El apellido es obligatorio";
      if (!nombreUsuario.trim()) newErrors.nombreUsuario = "El nombre de usuario es obligatorio";
      if (!contrasena.trim()) newErrors.contrasena = "La contraseña es obligatoria";
      if (!dni.trim() || isNaN(dni)) newErrors.dni = "DNI es obligatorio y debe ser numérico";
      if (!fechanacimiento.trim()) newErrors.fechanacimiento = "La fecha de nacimiento es obligatoria";
      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;

    }

    //Petición para alta de Alumno
    const altaAlumno = async (e) => {
      e.preventDefault();

      //Validar los campos
      if (!validarCampos()) return;

      const alumnoData = {
        name: nombre,
        lastName: apellido,
        username: nombreUsuario,
        password: contrasena,
        dni: dni,
        birthdate: fechanacimiento, 
        rol: "ROLE_STUDENT",
        courseId: idCurso
      };

      try {
        const response = await axios.post(`${API_URL}/person/add`, alumnoData, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        console.log('Alumno creado: ', response.data);
        getAlumnos();
      } catch (error) {
        console.log('Error al crear el alumno: ', error);
      }
    }

    return (
        <Fondo >
            <div className="header-vertical">
                <Navbar/>
            </div>
            <body className="gestionAlumnos">
                <h1 className="titulo">Gestión de alumnos: 1°A - 2024</h1>
                <div className="contenido">
                    <div className="listaAlumnos">
                      {loading ? <p>Cargando alumnos</p> : <p> </p>}
                      {alumnos.length === 0 ? <p>No hay alumnos asociados a este curso</p> : <p></p>}
                      {alumnos.map((alumno) => (
                        <AlumnoCard
                          nombre={alumno.name + ' ' + alumno.lastName}
                          usuario={alumno.username}
                          dni={alumno.dni}
                          fechaNacimiento={alumno.birthdate}
                          handleVerAlumno={verPerfil}
                          handleEditar={() => editar(`${alumno.name} ${alumno.lastName}`)}
                          handleEliminar={() => eliminar(`${alumno.name} ${alumno.lastName}`)}
                        />
                      ))}
                    </div>
                    <Agregar onClick={agregar}/>
                </div>
            </body>
            {popupEliminar && (
              <ModalChico 
                titulo="Dar de baja un alumno"
                cerrar={cancelarEliminar} 
                colorFondo={colors.rojo}
              >
                <div className="bodyModal">
                    <p style={{padding:' 0 30px', textAlign:'left',}}>
                    Se eliminará el progreso y las actividades realizadas por el alumno.<br/>
                    Si está seguro que desea desvincular a <b>{alumnoSeleccionado}</b> haga clic en Aceptar
                    </p>
                </div>
              </ModalChico>
            )}
            {popupEditar && (
                <ModalMediano 
                titulo="Editar alumno"
                cerrar={cancelarEditar} 
                colorFondo={colors.celesteOscuro} 
                >
                    <div className="bodyModal">
                  <div id="headAlumno" className="introduccion">
                    <p>Estás modificando los datos del alumno: <b>{alumnoSeleccionado}</b></p>
                  </div>
                  <form id="formAlumno">
                    <div>
                        <input placeholder="Nombre"/>
                        <input placeholder="Usuario"/>
                        <input placeholder="DNI"/>
                    </div>
                    <div>
                        <input placeholder="Apellido"/>
                        <input placeholder="Contraseña"/>
                        <input placeholder="dd-mm-aa"/>
                    </div>
                  </form>
                </div>
                </ModalMediano>
            )}
            {popupAgregar && (
              <ModalMediano 
                titulo="Agregar un alumno nuevo"
                cerrar={cancelarAgregar} 
                colorFondo={colors.violeta}
                aceptar={altaAlumno}
              >
                <div className="bodyModal">
                  <div id="headAlumno" className="introduccion">
                    <p>Para agregar un alumno complete los siguientes datos:</p>
                  </div>
                  <form id="formAlumno">
                    <div>
                        <input placeholder="Nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} required/>
                        {errors.nombre && <p style={{ fontSize: '9px', color: 'red' }}>{errors.nombre}</p>}
                        <input placeholder="Usuario" value={nombreUsuario} onChange={(e) => setNombreUsuario(e.target.value)} required/>
                        {errors.nombreUsuario && <p style={{ fontSize: '9px', color: 'red' }}>{errors.nombreUsuario}</p>}
                        <input placeholder="DNI" value={dni} onChange={(e) => setDni(e.target.value)} required/>
                        {errors.dni && <p style={{ fontSize: '9px', color: 'red' }}>{errors.dni}</p>}
                    </div>
                    <div>
                        <input placeholder="Apellido" value={apellido} onChange={(e) => setApellido(e.target.value)} required/>
                        {errors.apellido && <p style={{ fontSize: '9px', color: 'red' }}>{errors.apellido}</p>}
                        <input placeholder="Contraseña" value={contrasena} onChange={(e) => setContrasena(e.target.value)} required/>
                        {errors.contrasena && <p style={{ fontSize: '9px', color: 'red' }}>{errors.contrasena}</p>}
                        <input placeholder="aaaa-mm-dd" value={fechanacimiento} onChange={(e) => setFechanacimiento(e.target.value)} required/>
                        {errors.fechanacimiento && <p style={{ fontSize: '9px', color: 'red' }}>{errors.fechanacimiento}</p>}
                    </div>
                  </form>
                </div>
              </ModalMediano>
            )}
        </Fondo>
    );
}

export default GestionAlumnos;
