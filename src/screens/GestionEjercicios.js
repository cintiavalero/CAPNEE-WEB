import React from "react";
import Fondo from "../components/FondoB";
import Navbar from "../components/NavbarVertical";
import "./general.css";
import "./Styles/GestionEjercicios.css";
import iconoFlecha from '../assets/icon-flecha.png'; 
import iconoEditar from '../assets/icon-editar.png'; 
import iconoEliminar from '../assets/icon-trash.png'; 

function GestionEjercicios() {
    return (
        <Fondo >
            <div className="header-vertical">
                <Navbar/>
            </div>
            <body className="gestionEjercicios">
                <h1 className="titulo">Administración de actividades del curso</h1>
                <h2>Usar y conocer los números: Selecione una actividad</h2>
                <div className="contenido">
                    <p id="cantidadEjercicios"><b> Cantidad de ejercicios cargados: 3</b></p>
                    <div className="listaEjercicios">
                        <article className="ejercicio">
                            <p> <b> Ejercicio 1: </b> Quiz números II - 24/07/2024</p>
                            <div className="accionesEjercicio">
                                <button className="fle">
                                    <img className="icono" src={iconoFlecha} alt="Ícono flecha" /> 
                                </button>
                                <button>
                                    <img className="icono" src={iconoEditar} alt="Ícono editar" /> 
                                </button>
                                <button>
                                    <img className="icono" src={iconoEliminar} alt="Ícono eliminar" />                                     
                                </button>                                
                            </div>
                        </article>
                        <article className="ejercicio">
                            <p><b> Ejercicio 2: </b>Quiz números II - 24/07/2024</p>
                            <div className="accionesEjercicio">
                                <button className="fle">
                                    <img className="icono" src={iconoFlecha} alt="Ícono flecha" /> 
                                </button>
                                <button>
                                    <img className="icono" src={iconoEditar} alt="Ícono editar" /> 
                                </button>
                                <button>
                                    <img className="icono" src={iconoEliminar} alt="Ícono eliminar" />                                     
                                </button>                                
                            </div>
                        </article>
                        <article className="ejercicio">
                            <p><b> Ejercicio 3: </b>Quiz números II - 24/07/2024</p>
                            <div className="accionesEjercicio">
                                <button className="fle">
                                    <img className="icono" src={iconoFlecha} alt="Ícono flecha" /> 
                                </button>
                                <button>
                                    <img className="icono" src={iconoEditar} alt="Ícono editar" /> 
                                </button>
                                <button>
                                    <img className="icono" src={iconoEliminar} alt="Ícono eliminar" />                                     
                                </button>                                
                            </div>
                        </article>
                    </div>
                </div>
            </body>
        </Fondo>
    );
}

export default GestionEjercicios;
