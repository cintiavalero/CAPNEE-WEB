import React, { useState, useEffect } from "react";
import Fondo from "../components/FondoB";
import Navbar from "../components/NavbarVertical";
import CartaEjercicio from "../components/EjercicioCard";
import "./general.css";
import "./Styles/GestionEjercicios.css";
import Agregar from "../components/BotonAgregar";
import ModalChico from "../components/ModalChico"; 
import ModalMediano from "../components/ModalMediano"; 
import ModalGrande from "../components/ModalGrande"; 
import colors from "../constants/colors";
import { useParams } from 'react-router-dom';
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const API_URL = 'http://149.50.140.55:8082';

function GestionEjercicios() {

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
  const mostrarExito = (mensaje) => {
    toast.success(mensaje, {
      position: "top-center",
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };
  
    const { idCurso, idActividad } = useParams();   

    const [nombreActividad, setNombreActividad] = useState('');
    const [ejercicios, setEjercicios] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [detallesEjercicio, setDetallesEjercicio] = useState([]);
    const [ejercicio, setEjercicio] = useState({
        title: "",
        statement: "",
        options: ["", "", "", ""],
        correctOptionPosition: 0,
        attachedImageBase64: "",
        courseId: null,
        thematicContentId: null
    });
    const [ejercicioSeleccionado, setEjercicioSeleccionado] = useState(null);
    const [idEjercicioSeleccionado, setIdEjercicioSeleccionado] = useState(null);

    const [popupEditar, setPopupEditar] = useState(false);    
    const editar = (idEjercicio, nombreEjercicio) => {
        getEjercicio(idEjercicio); 
        setEjercicioSeleccionado(nombreEjercicio);
        setIdEjercicioSeleccionado(idEjercicio); 
        setPopupEditar(true); 
    }; 
    const cancelarEditar = () => { setPopupEditar(false); };

    const [popupVer, setPopupVer] = useState(false);    
    const ver = (idEjercicio, nombreEjercicio) => {
        getDetallesEjercicio(idEjercicio); 
        setEjercicioSeleccionado(nombreEjercicio);
        setPopupVer(true); 
    };
    const cancelarVer = () => { setPopupVer (false); };

    const [popupEliminar, setPopupEliminar] = useState(false);    
    const eliminar = (idEjercicio) => {
        setIdEjercicioSeleccionado(idEjercicio); 
        setPopupEliminar(true); 
    };
    const cancelarEliminar = () => { setPopupEliminar(false); };

    const [popupAgregar, setPopupAgregar] = useState(false);    
    const agregar = () => { setPopupAgregar(true); };
    const cancelarAgregar = () => { setPopupAgregar(false); };

    //Estados para formulario de alta de ejercicio
    const [titulo, setTitulo] = useState('');
    const [imagenBase64, setImagenBase64] = useState('');
    const [enunciado, setEnunciado] = useState('');
    const [opciones, setOpciones] = useState(['', '', '', '']);
    const [indiceOpcionCorrecta, setIndiceOpcionCorrecta] = useState(null);

    const token = localStorage.getItem('token');

    //Petición para obtener ejercicios
    const getEjercicios = async () => {
        try {
            const response = await axios.get(`${API_URL}/exercises/get-all-by-course-id-and-thematic-content-id?courseId=${idCurso}&thematicContentId=${idActividad}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setNombreActividad(response.data.thematicContent);
            setEjercicios(response.data.exercises);
            setLoading(false);
        } catch (error) {
            setError('Error al cargar los ejercicios');
            setLoading(false);
        }
    }
    useEffect(() => {
        getEjercicios();
    }, [idCurso, idActividad, token]);

    //Petición para obtener los resultados de un ejercicio
    const getDetallesEjercicio = async (idEjercicio) => {
        try {
            const response = await axios.get(`${API_URL}/exercises/students?exerciseId=${idEjercicio}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            console.log('Detalles ejercicio: ', response.data);
            setDetallesEjercicio(response.data);
        } catch (error) {
            console.error('Error al obtener los detalles del ejercicio: ', error);
            mostrarError('Error inesperado 😨')
        }
    };
    
    // Petición para obtener los datos del ejercicio
    const getEjercicio = async (idEjercicio) => {
        try {
            const response = await axios.get(`${API_URL}/exercises/get-by-id?id=${idEjercicio}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            console.log('Ejercicio: ', response.data);
            setEjercicio(response.data);
        } catch (error) {
            console.error('Error al obtener el ejercicio: ', error);
        }
    };
    const guardarCambios = async (idEjercicio) => {
        const nuevoEjercicio = {
          ...ejercicio,
          courseId: parseInt(idCurso), 
          thematicContentId: parseInt(idActividad)  
        };
      
        setEjercicio(nuevoEjercicio);  
      
        try {
          const response = await axios.put(`${API_URL}/exercises/update?id=${idEjercicio}`, nuevoEjercicio, {
            headers: { Authorization: `Bearer ${token}` },
          });
      
          if (response.status === 200) {
            getEjercicios();
            cancelarEditar();
            alert('Los cambios se han guardado correctamente');
          } else {
            mostrarError("Hubo un problema al guardar los datos: 😓 ")
          }
        } catch (error) {
            console.error('Error al guardar los cambios: ', error);
            mostrarError("Error al editar: 😓 ", error.response.data.message)
        }
      };
      
      


    //Formulario de alta de ejercicio
    const handleImagenChange = (e) => {
        const file = e.target.files[0];
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagenBase64(reader.result);
            };
            reader.readAsDataURL(file);
        } else {
            alert("Por favor selecciona un archivo de imagen.");
        }
    };

    const handleRadioChange = (index) => {
        setIndiceOpcionCorrecta(index);
    };

    const handleOpcionChange = (index, value) => {
        const nuevasOpciones = [...opciones];
        nuevasOpciones[index] = value;
        setOpciones(nuevasOpciones);
    };

    const altaEjercicio = async (e) => {
        e.preventDefault();
        const imagenBase64Parseada = imagenBase64.replace(/^data:image\/\w+;base64,/, '');

        const datosFormulario = {
            title: titulo,
            statement: enunciado,
            options: opciones,
            correctOptionPosition: indiceOpcionCorrecta,
            attachedImageBase64: imagenBase64Parseada,
            thematicContentId: parseInt(idActividad),
            courseId: parseInt(idCurso)
        };

        console.log('Datos a enviar: ', datosFormulario);
        
        try {
            const response = await axios.post(`${API_URL}/exercises/add`, datosFormulario, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            console.log('Ejercicio creado: ', response.data);
            getEjercicios();
            cancelarAgregar();
            mostrarExito('Se creó el ejercicio correctamente 😀')
        } catch (error) {
            console.log('Error al crear el ejercicio: ', error);
            mostrarError("Error al crear el ejercicio: ",error.response.data.message)
        }
    };

    //Eliminar ejercicio
    const eliminarEjercicio = async (idEjercicio) => {
        try {
            const response = await axios.delete(`${API_URL}/exercises/delete/${idEjercicio}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            console.log('Ejercicio eliminado: ', response.data);
            getEjercicios();
            cancelarEliminar();
        } catch (error) {
            console.log('Error al eliminar el ejercicio: ', error);
            mostrarError(error.response.data.message)
        }
    };

    //Función para formatear el tiempo de resolución
    const formatTime = (miliseconds) => {
        const totalSeconds = Math.floor(miliseconds / 1000);
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;

        const formattedMinutes = String(minutes).padStart(2, '0');
        const formattedSeconds = String(seconds).padStart(2, '0');

        return `${formattedMinutes}:${formattedSeconds}`;
    }

    return (
        <Fondo >
            <ToastContainer />

            <div className="header-vertical">
                <Navbar/>
            </div>
            <body className="gestionEjercicios">
                <h1 className="titulo">Administración de actividades del curso</h1>
                <h2><b>{nombreActividad}:</b> Lista de ejercicios</h2>
                <div className="contenido">
                    <div className="listaEjercicios">
                    <p id="cantidadEjercicios"><b> Cantidad de ejercicios cargados: {ejercicios.length}</b></p>
                        {loading ? <p>Cargando Ejercicios</p> : <p> </p>}
                        {ejercicios.length === 0 ? <p>Aún no hay ejercicios cargados</p> : <p> </p>}
                        {ejercicios.map((ejercicio) => (
                            <CartaEjercicio
                                key={ejercicio.id}
                                nombre={ejercicio.title}
                                handleVerIntentos={() => ver(ejercicio.id, ejercicio.title)}
                                handleEditar={() => editar(ejercicio.id)}
                                handleEliminar={() => eliminar(ejercicio.id)}
                        />
                        ))}
                    </div>
                    <Agregar onClick={agregar}/>
                </div>
            </body>
            

            {popupEliminar && (
              <ModalChico 
                titulo="Eliminar ejercicio"
                cerrar={cancelarEliminar} 
                colorFondo={colors.rojo}
                aceptar={() => eliminarEjercicio(idEjercicioSeleccionado)}
              >
                <div className="bodyModal">
                    <p style={{padding:' 0 30px', textAlign:'left',}}>
                    Se eliminará el ejercicio seleccionado y el progreso de los alumnos de este curso sobre el mismo.<br/>
                    Si está seguro que desea eliminar el ejercicio haga clic en Aceptar
                    </p>
                </div>
              </ModalChico>
            )}


            {popupVer && (
              <ModalGrande 
                titulo="Revisión de respuestas"
                cerrar={cancelarVer} 
                colorFondo={colors.verde}
                aceptar={cancelarVer}
                guardar={cancelarVer}
              >
                <div className="bodyModal">
                <div id="headRespuestas" className="introduccion">
                    <h3>{ejercicioSeleccionado}</h3>
                </div>
                <div id="tablaRespuestas">
                    <div class="tabla-header">
                        <div>Alumno</div>
                        <div>Errores</div>
                        <div>Tiempo</div>
                        <div>Calificación</div>
                    </div>

                    {detallesEjercicio.length > 0 ? (
                        detallesEjercicio.map((detalle) => (
                            <div className="tabla-fila" key={detalle.id}>
                                <div>{detalle.name} {detalle.lastName}</div>
                                <div>{detalle.numberOfAttempts}</div>
                                <div>{detalle.timeOfResolution > 0 ? formatTime(detalle.timeOfResolution): '-'}</div>
                                <div>{detalle.score }/5<span className="estrella">⭐</span></div>
                            </div>
                        ))
                    ) : (
                        <p>No hay intentos registrados para este ejercicio.</p>
                    )}
                    </div>
                    <p className="textoTotalAlumnos">Total de alumnos que resolvieron este ejercicio: {detallesEjercicio.length}</p>
                </div>
              </ModalGrande>
            )}


            {popupAgregar && (
            <ModalGrande 
                titulo="Agregar un ejercicio nuevo"
                cerrar={cancelarAgregar} 
                colorFondo={colors.violeta}
                aceptar={altaEjercicio}
            >
                <div className="bodyModal">
                <div id="headEjercicio" className="introduccion">
                    <p>Para agregar un ejercicio nuevo, complete los siguientes campos:</p>
                </div>
                <form id="formEjercicio">
                    <section>
                        <div className="inputGroup tituloInput">
                            <label>Título del ejercicio:</label>
                            <input 
                                type="text"
                                value={titulo} 
                                placeholder="Ingrese un título..."
                                onChange={(e) => setTitulo(e.target.value)} 
                            />
                        </div>
                        <div className="inputGroup imagenInput">
                            <label>Imagen para la consigna:</label>
                            <input type="file" accept="image/*" onChange={handleImagenChange} />
                        </div>
                    </section>
                    <section>
                        <div className="inputGroup descripcionInput">
                            <label>Enunciado:</label>
                            <textarea 
                                value={enunciado}
                                onChange={(e) => setEnunciado(e.target.value)}
                                placeholder="Descripción del ejercicio...">    
                            </textarea>
                        </div>

                        <div className="opcionesRespuesta">
                            <label>Opciones de respuesta (<span className="textoVerde">elija la correcta</span>):</label>
                            {opciones.map((opcion, index) => (
                                <div className="opcion" key={index}>
                                    <input 
                                        type="radio" 
                                        name="respuestaCorrecta" 
                                        checked={indiceOpcionCorrecta === index} 
                                        onChange={() => handleRadioChange(index)} 
                                    />
                                    <input 
                                        type="text"
                                        value={opcion.texto}
                                        onChange={(e) => handleOpcionChange(index, e.target.value)} 
                                        placeholder={`Opción ${index + 1}`} 
                                    />
                                    {/* <button className="eliminarOpcion">-</button> */}
                                </div>
                            ))}
                            {console.log('Opcion correcta: ', indiceOpcionCorrecta)}                
                        </div>
                    </section>
                </form>
                </div>
            </ModalGrande>
            )}

            
{popupEditar && (
    <ModalGrande 
        titulo="Modificar ejercicio "
        cerrar={cancelarEditar} 
        colorFondo={colors.celesteOscuro}
        aceptar={() => guardarCambios(idEjercicioSeleccionado)}
    >
        <div className="bodyModal">
            <div id="headEjercicio" className="introduccion">
                <p>Está modificando el ejercicio: {ejercicio.title}</p>
            </div>
            <form id="formEjercicio">
                <section>
                    <div className="inputGroup tituloInput">
                        <label>Título del ejercicio:</label>
                        <input 
                            type="text" 
                            placeholder="Ingrese un título..." 
                            value={ejercicio.title} 
                            onChange={(e) => setEjercicio({ ...ejercicio, title: e.target.value })} 
                        />
                    </div>
                    <div className="inputGroup imagenInput">
                        <label style={{display: 'inline'}}>  Imagen para la consigna: 
                            <small style={{display: 'inline',  fontWeight: 'normal'}}>{ejercicio.attachedImageBase64 ? " Tiene una imagen cargada" : ""}</small>
                        </label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                                const file = e.target.files[0];
                                const reader = new FileReader();
                                reader.onload = () => {
                                    setEjercicio({ ...ejercicio, attachedImageBase64: reader.result });
                                };
                                reader.readAsDataURL(file);
                            }}
                        />
                    </div>
                </section>
                <section>
                    <div className="inputGroup descripcionInput">
                        <label>Enunciado:</label>
                        <textarea 
                            placeholder="Descripción del ejercicio..."
                            value={ejercicio.statement}
                            onChange={(e) => setEjercicio({ ...ejercicio, statement: e.target.value })}
                        ></textarea>
                    </div>

                    <div className="opcionesRespuesta">
                        <label>
                            Opciones de respuesta (<span className="textoVerde">elija la correcta</span>):
                        </label>
                        {(ejercicio.options || []).map((opcion, index) => (
                            <div className="opcion" key={index}>
                                <input
                                    type="radio"
                                    name="respuestaCorrecta"
                                    checked={ejercicio.correctOptionPosition === index}
                                    onChange={() => setEjercicio({ ...ejercicio, correctOptionPosition: index })}
                                />
                                <input
                                    type="text"
                                    placeholder={`Opción ${index + 1}`}
                                    value={opcion}
                                    onChange={(e) => {
                                        const updatedOptions = [...ejercicio.options];
                                        updatedOptions[index] = e.target.value;
                                        setEjercicio({ ...ejercicio, options: updatedOptions });
                                    }}
                                />
                            </div>
                        ))}
                    </div>
                </section>
            </form>
        </div>
    </ModalGrande>
)}

        </Fondo>
    );
}

export default GestionEjercicios;
