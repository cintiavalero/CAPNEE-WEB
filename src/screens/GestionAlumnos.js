import React, { useState } from "react";
import Fondo from "../components/FondoB";
import Navbar from "../components/NavbarHorizontal";
import Agregar from "../components/BotonAgregar";
import "./general.css";
import "./Styles/GestionAlumnos.css";
import iconoFlecha from '../assets/icon-flecha.png'; 
import iconoEditar from '../assets/icon-editar.png'; 
import iconoEliminar from '../assets/icon-trash.png'; 
import ModalChico from "../components/ModalChico"; 
import ModalMediano from "../components/ModalMediano"; 
import colors from "../constants/colors";
import { useNavigate } from 'react-router-dom';


function GestionAlumnos() {
    const navigate = useNavigate();

    const [popupEditar, setPopupEditar] = useState(false);    
    const editar = () => { setPopupEditar(true); };
    const cancelarEditar = () => { setPopupEditar(false); };

    const [popupEliminar, setPopupEliminar] = useState(false);    
    const eliminar = () => { setPopupEliminar(true); };
    const cancelarEliminar = () => { setPopupEliminar(false); };

    const [popupAgregar, setPopupAgregar] = useState(false);    
    const agregar = () => { setPopupAgregar(true); };
    const cancelarAgregar = () => { setPopupAgregar(false); };
    


    return (
        <Fondo >
            <header>
                <Navbar/>
            </header>
            <body className="gestionAlumnos">
                <h1 className="titulo">Gestión de alumnos: 1°A - 2024</h1>
                <div className="contenido">
                    <div className="listaAlumnos">
                        <article className="alumno">
                            <div className="datosAlumno">
                                <div className="datosUsuarioAlumno">
                                    <p><b>Franco Borsella</b></p>
                                    <small>Usuario: fborsella</small>
                                </div>
                                <div className="datosPersonalesAlumno">
                                    <p><b>DNI:</b>12312312</p>
                                    <p><b>Nacimiento:</b>01/10/2000</p>
                                </div>
                            </div>
                            <div className="accionesAlumno">
                                <button onClick={() => navigate('/gestionbloques')}>
                                    <img className="icono" src={iconoFlecha} alt="Ícono flecha" /> 
                                    Progreso
                                </button>
                                <button onClick={editar}>
                                    <img className="icono" src={iconoEditar} alt="Ícono editar" /> 
                                    Modificar
                                </button>
                                <button onClick={eliminar}>
                                    <img className="icono" src={iconoEliminar} alt="Ícono eliminar" />                                     
                                    Desvincular
                                </button>
                            </div>
                        </article>
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
                    Si está seguro que desea desvincular a <b> Franco Borsella de 1° A</b> haga clic en Aceptar
                    </p>
                </div>
              </ModalChico>
            )}
            {popupEditar && (
                <ModalMediano 
                titulo="Editar un curso"
                cerrar={cancelarEditar} 
                colorFondo={colors.celesteOscuro} 
                >
                    <div className="bodyModal">
                  <div id="headAlumno" className="introduccion">
                    <p>Estás modificando los datos del alumno: <b>Franco Borsella</b></p>
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
                        <input placeholder="dd/mm/aa"/>
                    </div>
                  </form>
                </div>
                </ModalMediano>
            )}
            {popupAgregar && (
              <ModalMediano 
                titulo="Agregar un curso nuevo"
                cerrar={cancelarAgregar} 
                colorFondo={colors.violeta}
              >
                <div className="bodyModal">
                  <div id="headAlumno" className="introduccion">
                    <p>Para agregar un curso complete los siguientes datos:</p>
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
                        <input placeholder="dd/mm/aa"/>
                    </div>
                  </form>
                </div>
              </ModalMediano>
            )}
        </Fondo>
    );
}

export default GestionAlumnos;
