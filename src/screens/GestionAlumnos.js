import React from "react";
import Fondo from "../components/FondoB";
import Navbar from "../components/NavbarHorizontal";
import Agregar from "../components/BotonAgregar";
import "./general.css";
import "./Styles/GestionAlumnos.css";
import iconoFlecha from '../assets/icon-flecha.png'; 
import iconoEditar from '../assets/icon-editar.png'; 
import iconoEliminar from '../assets/icon-trash.png'; 

function GestionAlumnos() {
    return (
        <Fondo >
            <header>
                <Navbar/>
            </header>
            <body className="gestionAlumnos">
                <h1 className="titulo">Gestión de alumnos: Año y division</h1>
                <div className="contenido">
                    <div className="listaAlumnos">
                        <article className="alumno">
                            <div className="datosAlumno">
                                <div className="datosUsuarioAlumno">
                                    <p><b>Un nombre</b></p>
                                    <small>Usuario: unusuario</small>
                                </div>
                                <div className="datosPersonalesAlumno">
                                    <p><b>DNI:</b>12312312</p>
                                    <p><b>Nacimiento:</b>12/12/1231</p>
                                </div>
                            </div>
                            <div className="accionesAlumno">
                                <button className="fle">
                                    <img className="icono" src={iconoFlecha} alt="Ícono flecha" /> 
                                    Progreso
                                </button>
                                <button>
                                    <img className="icono" src={iconoEditar} alt="Ícono editar" /> 
                                    Modificar
                                </button>
                                <button>
                                    <img className="icono" src={iconoEliminar} alt="Ícono eliminar" />                                     
                                    Desvincular
                                </button>
                            </div>
                        </article>
                    </div>
                    <Agregar/>
                </div>
            </body>
        </Fondo>
    );
}

export default GestionAlumnos;
