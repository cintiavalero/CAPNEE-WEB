import React from "react";
import Fondo from "../components/FondoB";
import Navbar from "../components/NavbarHorizontal";
import Agregar from "../components/BotonAgregar";
import "./general.css";
import "./Styles/ListadoCursos.css";
import iconoFlecha from '../assets/icon-flecha.png'; 
import iconoEditar from '../assets/icon-editar.png'; 
import iconoEliminar from '../assets/icon-trash.png'; 

function ListadoCursos() {
    return (
        <Fondo >
            <header>
                <Navbar/>
            </header>
            <body className="listadoCursos">
                <h1 className="titulo">Listado de cursos</h1>
                <div className="contenido">
                    <p id="cicloLectivo">Ciclo lectivo 2024</p>
                    <div className="listaCursos">
                        <article className="curso">
                            <p id="añoDivision">1°A</p>
                            <div className="accionesCurso">
                                <button className="fle">
                                    <img className="icono" src={iconoFlecha} alt="Ícono flecha" /> 
                                    Ver curso
                                </button>
                                <button>
                                    <img className="icono" src={iconoEditar} alt="Ícono editar" /> 
                                    Modificar
                                </button>
                                <button>
                                    <img className="icono" src={iconoEliminar} alt="Ícono eliminar" />                                     
                                    Eliminar
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

export default ListadoCursos;
