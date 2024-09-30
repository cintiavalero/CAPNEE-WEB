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
                titulo="Dar de baja un curso"
                cerrar={cancelarEliminar} 
                colorFondo={colors.rojo} 
                contenido={
                    <>
                        ¿Está seguro que desea dar de baja el curso <b>1°A - 2024</b>?
                    </>
                }
                />
            )}
            {popupEditar && (
              <ModalMediano 
                titulo="Editar un curso"
                cerrar={cancelarEditar} 
                colorFondo={colors.celesteOscuro} 
                contenido={
                    <>
                        Está <b>Editanto</b>
                    </>
                }
                />
            )}
            {popupVer && (
              <ModalGrande 
                titulo="Visualizar curso"
                cerrar={cancelarVer} 
                colorFondo={colors.verde} 
                contenido={
                    <>
                        Está <b>Viendo</b>
                    </>
                }
                />
            )}
            {popupAgregar && (
              <ModalMediano 
                titulo="Dar de alta un curso"
                cerrar={cancelarAgregar} 
                colorFondo={colors.violeta} 
                contenido={
                    <>
                        Está <b>Editanto</b>
                    </>
                }
                />
            )}
        </Fondo>
    );
}

export default GestionEjercicios;
