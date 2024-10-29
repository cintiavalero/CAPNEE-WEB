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

const API_URL = 'http://149.50.140.55:8082';

function GestionEjercicios() {
    const [nombreActividad, setNombreActividad] = useState('');
    const [ejercicios, setEjercicios] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [popupEditar, setPopupEditar] = useState(false);    
    const editar = () => { setPopupEditar(true); };
    const cancelarEditar = () => { setPopupEditar(false); };

    const [popupVer, setPopupVer] = useState(false);    
    const ver = () => { setPopupVer(true); };
    const cancelarVer = () => { setPopupVer (false); };

    const [popupEliminar, setPopupEliminar] = useState(false);    
    const eliminar = () => { setPopupEliminar(true); };
    const cancelarEliminar = () => { setPopupEliminar(false); };

    const [popupAgregar, setPopupAgregar] = useState(false);    
    const agregar = () => { setPopupAgregar(true); };
    const cancelarAgregar = () => { setPopupAgregar(false); };

    //Recuperar parámetros de ruta
    const { idCurso, idActividad } = useParams();

    //Recuperar token
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
            setError('Error al cargar los bloques');
            setLoading(false);
        }
    }

    useEffect(() => {
        getEjercicios();
    }, [idCurso, idActividad, token])

    return (
        <Fondo >
            <div className="header-vertical">
                <Navbar/>
            </div>
            <body className="gestionEjercicios">
                <h1 className="titulo">Administración de actividades del curso</h1>
                <h2><b>{nombreActividad}:</b> Lista de ejercicios</h2>
                <div className="contenido">
                    <p id="cantidadEjercicios"><b> Cantidad de ejercicios cargados: {ejercicios.length}</b></p>
                    <div className="listaEjercicios">
                        {loading ? <p>Cargando Ejercicios</p> : <p> </p>}
                        {ejercicios.length === 0 ? <p>Aún no hay ejercicios cargados</p> : <p> </p>}
                        {ejercicios.map((ejercicio) => (
                            <CartaEjercicio
                                key = {ejercicio.id}
                                nombre = {ejercicio.title}
                                handleVerIntentos = {ver}
                                handleEditar = {editar}
                                handleEliminar = {eliminar}
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
              >
                <div className="bodyModal">
                <div id="headRespuestas" className="introduccion">
                    <h3>Ejercicio 1: Quiz de números - 20/07/2024</h3>
                </div>
                
                <div id="tablaRespuestas">
                    <div class="tabla-header">
                        <div>Alumno</div>
                        <div>Resuelto</div>
                        <div>Intentos</div>
                        <div>Tiempo</div>
                        <div>Calificación</div>
                    </div>

                    <div class="tabla-fila">
                        <div>Borsella Franco Ezequiel</div>
                        <div>Sí</div>
                        <div>1</div>
                        <div>00:35</div>
                        <div>5 <span class="estrella">⭐</span></div>
                    </div>

                    <div class="tabla-fila">
                        <div>Etcheverry Juan Ignacio</div>
                        <div>Sí</div>
                        <div>2</div>
                        <div>00:50</div>
                        <div>4 <span class="estrella">⭐</span></div>
                    </div>

                    <div class="tabla-fila">
                        <div>Batista Matías Omar</div>
                        <div>No</div>
                        <div>-</div>
                        <div>-</div>
                        <div>-</div>
                    </div>

                    <div class="tabla-fila">
                        <div>Valero Cintia Milagros</div>
                        <div>Sí</div>
                        <div>4</div>
                        <div>01:24</div>
                        <div>1 <span class="estrella">⭐</span></div>
                    </div>
                    </div>
                </div>
              </ModalGrande>
            )}
            {popupAgregar && (
  <ModalGrande 
    titulo="Agregar un ejercicio nuevo"
    cerrar={cancelarAgregar} 
    colorFondo={colors.violeta}
  >
    <div className="bodyModal">
      <div id="headEjercicio" className="introduccion">
        <p>Para agregar un ejercicio nuevo, complete los siguientes campos:</p>
      </div>
      <form id="formEjercicio">
        <section>
            <div className="inputGroup tituloInput">
                <label>Título del ejercicio:</label>
                <input type="text" placeholder="Ingrese un título..." />
            </div>
            <div className="inputGroup imagenInput">
                <label>Imagen para la consigna:</label>
                <button id="agregarImagen"> Agregar imagen </button>
            </div>
        </section>
        <section>
            <div className="inputGroup descripcionInput">
                <label>Enunciado:</label>
                <textarea placeholder="Descripción del ejercicio..."></textarea>
            </div>

            <div className="opcionesRespuesta">
                <label>Opciones de respuesta (<span className="textoVerde">elija la correcta</span>):</label>
                <div className="opcion">
                    <input type="radio" name="respuestaCorrecta" />
                    <input type="text" placeholder="Opción 1" />
                    <button className="eliminarOpcion">-</button>
                </div>
                <div className="opcion">
                    <input type="radio" name="respuestaCorrecta" />
                    <input type="text" placeholder="Opción 2" />
                    <button className="eliminarOpcion">-</button>
                </div>
                <div className="opcion">
                    <input type="radio" name="respuestaCorrecta" />
                    <input type="text" placeholder="Opción 2" />
                    <button className="eliminarOpcion">-</button>
                </div>
                <button className="agregarOpcion">+</button>
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
  >
    <div className="bodyModal">
      <div id="headEjercicio" className="introduccion">
        <p>Está modificado el ejercicio: 1</p>
      </div>
      <form id="formEjercicio">
        <section>
            <div className="inputGroup tituloInput">
                <label>Título del ejercicio:</label>
                <input type="text" placeholder="Ingrese un título..." />
            </div>
            <div className="inputGroup imagenInput">
                <label>Imagen para la consigna:</label>
                <button id="agregarImagen"> Agregar imagen </button>
            </div>
        </section>
        <section>
            <div className="inputGroup descripcionInput">
                <label>Enunciado:</label>
                <textarea placeholder="Descripción del ejercicio..."></textarea>
            </div>

            <div className="opcionesRespuesta">
                <label>Opciones de respuesta (<span className="textoVerde">elija la correcta</span>):</label>
                <div className="opcion">
                    <input type="radio" name="respuestaCorrecta" />
                    <input type="text" placeholder="Opción 1" />
                    <button className="eliminarOpcion">-</button>
                </div>
                <div className="opcion">
                    <input type="radio" name="respuestaCorrecta" />
                    <input type="text" placeholder="Opción 2" />
                    <button className="eliminarOpcion">-</button>
                </div>
                <div className="opcion">
                    <input type="radio" name="respuestaCorrecta" />
                    <input type="text" placeholder="Opción 2" />
                    <button className="eliminarOpcion">-</button>
                </div>
                <button className="agregarOpcion">+</button>
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
