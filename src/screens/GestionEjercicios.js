import React, { useState } from "react";
import Fondo from "../components/FondoB";
import Navbar from "../components/NavbarVertical";
import "./general.css";
import "./Styles/GestionEjercicios.css";
import Agregar from "../components/BotonAgregar";
import iconoFlecha from '../assets/icon-flecha.png'; 
import iconoEditar from '../assets/icon-editar.png'; 
import iconoEliminar from '../assets/icon-trash.png'; 
import ModalChico from "../components/ModalChico"; 
import ModalMediano from "../components/ModalMediano"; 
import ModalGrande from "../components/ModalGrande"; 
import colors from "../constants/colors";


function GestionEjercicios() {

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

    return (
        <Fondo >
            <div className="header-vertical">
                <Navbar/>
            </div>
            <body className="gestionEjercicios">
                <h1 className="titulo">Administración de actividades del curso</h1>
                <h2>Usar y conocer los números: Lista de ejercicios</h2>
                <div className="contenido">
                    <p id="cantidadEjercicios"><b> Cantidad de ejercicios cargados: 3</b></p>
                    <div className="listaEjercicios">
                        <article className="ejercicio">
                            <p> <b> Ejercicio 1: </b> Quiz números II - 24/07/2024</p>
                            <div className="accionesEjercicio">
                                <button  onClick={ver}>
                                    <img className="icono" src={iconoFlecha} alt="Ícono flecha" /> 
                                </button>
                                <button  onClick={editar}>
                                    <img className="icono" src={iconoEditar} alt="Ícono editar" /> 
                                </button>
                                <button onClick={eliminar}>
                                    <img className="icono" src={iconoEliminar} alt="Ícono eliminar" />                                     
                                </button>                                    
                            </div>
                        </article>
                        <article className="ejercicio">
                            <p><b> Ejercicio 2: </b>Quiz números II - 24/07/2024</p>
                            <div className="accionesEjercicio">
                                <button  onClick={ver}>
                                    <img className="icono" src={iconoFlecha} alt="Ícono flecha" /> 
                                </button>
                                <button  onClick={editar}>
                                    <img className="icono" src={iconoEditar} alt="Ícono editar" /> 
                                </button>
                                <button onClick={eliminar}>
                                    <img className="icono" src={iconoEliminar} alt="Ícono eliminar" />                                     
                                </button>                                 
                            </div>
                        </article>
                        <article className="ejercicio">
                            <p><b> Ejercicio 3: </b>Quiz números II - 24/07/2024</p>
                            <div className="accionesEjercicio">
                                <button  onClick={ver}>
                                    <img className="icono" src={iconoFlecha} alt="Ícono flecha" /> 
                                </button>
                                <button  onClick={editar}>
                                    <img className="icono" src={iconoEditar} alt="Ícono editar" /> 
                                </button>
                                <button onClick={eliminar}>
                                    <img className="icono" src={iconoEliminar} alt="Ícono eliminar" />                                     
                                </button>                                
                            </div>
                        </article>
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
