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
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const API_URL = 'http://149.50.140.55:8081';

function GestionAlumnos() {
    const [curso, setCurso] = useState('');
    const [alumnos, setAlumnos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const { idCurso, idUsuario } = useParams();

    //Valores del formulario de alta
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [nombreUsuario, setNombreUsuario] = useState('');
    const [contrasena, setContrasena] = useState('');
    const [dni, setDni] = useState('');
    const [fechanacimiento, setFechanacimiento] = useState('');
    const [errors, setErrors] = useState({});


    const navigate = useNavigate();
    const verPerfil = (idUsuario) => {
      navigate(`/perfil/${idCurso}/${idUsuario}`);
    }

    const [popupEditar, setPopupEditar] = useState(false);    
    const editar = (alumno) => {
      setAlumnoSeleccionado(alumno); 
      setPopupEditar(true); 
    };
    const cancelarEditar = () => {
      setAlumnoSeleccionado(''); 
      setPopupEditar(false); 
      setErrors({});
    };
    

    const [popupEliminar, setPopupEliminar] = useState(false);
    const [alumnoSeleccionado, setAlumnoSeleccionado] = useState('');    
    const eliminar = (alumno, idAlumno) => { 
      setAlumnoSeleccionado(idAlumno);
      setPopupEliminar(true); 
    };
    const cancelarEliminar = () => {
      setAlumnoSeleccionado(''); 
      setPopupEliminar(false); 
      setErrors({});
    };

    const [popupAgregar, setPopupAgregar] = useState(false);    
    const agregar = () => { setPopupAgregar(true); };
    const cancelarAgregar = () => { setPopupAgregar(false); setErrors({});};
    
  // Función para mostrar la alerta flotante de error
  const mostrarError = (mensaje) => {
    toast.error(mensaje, {
      position: "top-center",
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };
    const token = localStorage.getItem('token');

    //Petición para obtener un curso por id
    const getCurso = async (idCurso) => {
      try {
        const response = await axios.get(`${API_URL}/course/get-by-id?id=${idCurso}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setCurso(`${response.data.level.slice(-1)}°${response.data.division} - ${response.data.academicYear}`);
        setLoading(false);
      } catch (error) {
        setError('Error al cargar el curso');
        setLoading(false);
      }
    }

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
      getCurso(idCurso);
      getAlumnos();
    }, [idCurso]);

    //Petición para eliminar alumno
    const eliminarAlumno = async (idAlumno) => {
      try {
        const response = await axios.delete(`${API_URL}/person/delete?id=${idAlumno}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        console.log('Alumno eliminado: ', response.data);

        getAlumnos();
        cancelarEliminar();
      } catch (error) {
        console.log('Error al eliminar el alumno: ', error);
      }
    }

    //Petición para alta de Alumno
    const altaAlumno = async (e) => {
      e.preventDefault();
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
        cancelarAgregar();
      } catch (error) {
        console.log('Error al crear el alumno: ', error);
        mostrarError("Error al crear el alumnno: 👀", error.response.data.message)
      }
    }

    //Validar datos de alumno
    const validarCampos = () => {
      const newErrors = {};
      const today = new Date().toISOString().split("T")[0];
    
      if (!nombre.trim()) newErrors.nombre = "El nombre es obligatorio";
      if (!apellido.trim()) newErrors.apellido = "El apellido es obligatorio";
      if (!nombreUsuario.trim()) newErrors.nombreUsuario = "El nombre de usuario es obligatorio";
      if (!contrasena.trim()) {
        newErrors.contrasena = "La contraseña es obligatoria";
      } else if (contrasena.length < 4) {
        newErrors.contrasena = "La contraseña debe tener al menos 4 caracteres";
      }
      if (!dni.trim() || isNaN(dni)) {
        newErrors.dni = "El DNI es obligatorio";
      } else if (dni.length > 11) {
        newErrors.dni = "El DNI no puede tener más de 11 caracteres";
      } else if (dni.length < 8) {
        newErrors.dni = "El DNI debe tener por lo menos 8 caracteres";
      }
          if (!fechanacimiento.trim()) {
        newErrors.fechanacimiento = "La fecha de nacimiento es obligatoria";
      } else if (fechanacimiento > today) {
        newErrors.fechanacimiento = "La fecha de nacimiento no puede ser posterior a hoy";
      }
    
      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    };
    

    

    return (
        <Fondo >
                <ToastContainer />

            <div className="header-vertical">
                <Navbar/>
            </div>
            <body className="gestionAlumnos">
                <h1 className="titulo">Gestión de alumnos: {curso}</h1>
                <div className="contenido">
                    <div className="listaAlumnos">
                      <p id="cantidadEjercicios"><b> Cantidad de alumnos: {alumnos.length}</b></p>
                      {loading ? <p>Cargando alumnos</p> : <p> </p>}
                      {alumnos.length === 0 ? <p>No hay alumnos asociados a este curso</p> : <p></p>}
                      {alumnos.map((alumno) => (
                        <AlumnoCard
                          key={alumno.id}
                          nombre={alumno.name + ' ' + alumno.lastName}
                          usuario={alumno.username}
                          dni={alumno.dni}
                          fechaNacimiento={alumno.birthdate}
                          handleVerAlumno={() => verPerfil(alumno.id)}
                          handleEditar={() => editar(`${alumno.name} ${alumno.lastName}`)}
                          handleEliminar={() => eliminar(`${alumno.name} ${alumno.lastName}`, alumno.id)}
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
                aceptar={() => eliminarAlumno(alumnoSeleccionado)}
              >
                <div className="bodyModal">
                    <p style={{padding:' 0 30px', textAlign:'left',}}>
                    Se eliminará el progreso y las actividades realizadas por el alumno.<br/>
                    Si está seguro que desea desvincular al alumno seleccionado haga clic en Aceptar
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
                        <div className="datoAlumno">
                          <input placeholder="Nombre"/>
                        </div>
                        <div className="datoAlumno">
                          <input placeholder="Apellido"/>
                        </div>
                    </div>
                    <div>
                        <div className="datoAlumno">
                          <input placeholder="Usuario" required/>
                        </div>
                        <div className="datoAlumno">
                          <input type="password" placeholder="Contraseña" required/>
                        </div>
                    </div>
                    <div>
                      <div className="datoAlumno">
                        <input type="number" placeholder="DNI" required/>
                      </div>
                      <div className="datoAlumno">
                        <input type="date" required/>
                      </div>
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
                        <div className="datoAlumno">
                          <input placeholder="Nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} required/>
                          {errors.nombre && <p style={{ padding: '5px',fontSize: '10px', color: 'red' }}>{errors.nombre}</p>}
                        </div>
                        <div className="datoAlumno">
                          <input placeholder="Apellido" value={apellido} onChange={(e) => setApellido(e.target.value)} required/>
                          {errors.apellido && <p style={{ padding: '5px',fontSize: '10px', color: 'red' }}>{errors.apellido}</p>}
                        </div>
                    </div>
                    <div>
                        <div className="datoAlumno">
                          <input placeholder="Usuario" value={nombreUsuario} onChange={(e) => setNombreUsuario(e.target.value)} required/>
                          {errors.nombreUsuario && <p style={{ padding: '5px',fontSize: '10px', color: 'red' }}>{errors.nombreUsuario}</p>}
                        </div>
                        <div className="datoAlumno">
                          <input type="password" placeholder="Contraseña" value={contrasena} onChange={(e) => setContrasena(e.target.value)} required/>
                          {errors.contrasena && <p style={{ padding: '5px',fontSize: '10px', color: 'red' }}>{errors.contrasena}</p>}
                        </div>
                    </div>
                    <div>
                      <div className="datoAlumno">
                        <input type="number" placeholder="DNI" value={dni} onChange={(e) => setDni(e.target.value)} required/>
                        {errors.dni && <p style={{ padding: '5px',fontSize: '10px', color: 'red' }}>{errors.dni}</p>}
                      </div>
                      <div className="datoAlumno">
                        <input type="date" placeholder="aaaa-mm-dd" value={fechanacimiento} onChange={(e) => setFechanacimiento(e.target.value)} required/>
                        {errors.fechanacimiento && <p style={{ padding: '5px',fontSize: '10px', color: 'red' }}>{errors.fechanacimiento}</p>}
                      </div>
                    </div>
                  </form>
                </div>
              </ModalMediano>
            )}
        </Fondo>
    );
}

export default GestionAlumnos;
