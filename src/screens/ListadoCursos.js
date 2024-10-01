import React, { useState } from "react";
import Fondo from "../components/FondoB";
import Navbar from "../components/NavbarHorizontal";
import Agregar from "../components/BotonAgregar";
import ModalChico from "../components/ModalChico"; 
import ModalMediano from "../components/ModalMediano"; 
import ModalGrande from "../components/ModalGrande"; 
import "./general.css";
import "./Styles/ListadoCursos.css";
import iconoFlecha from '../assets/icon-flecha.png'; 
import iconoEditar from '../assets/icon-editar.png'; 
import iconoEliminar from '../assets/icon-trash.png'; 
import colors from "../constants/colors";
import { useNavigate } from 'react-router-dom';


function ListadoCursos() {

    const navigate = useNavigate();

    const handleAlumnos = (e) => {
      e.preventDefault();
        navigate('/gestionalumnos')
    };

    const [popupEditar, setPopupEditar] = useState(false);    
    const editar = () => { setPopupEditar(true); };
    const cancelarEditar = () => { setPopupEditar(false); };

    const [popupEliminar, setPopupEliminar] = useState(false);    
    const eliminar = () => { setPopupEliminar(true); };
    const cancelarEliminar = () => { setPopupEliminar(false); };

    const [popupAgregar, setPopupAgregar] = useState(false);    
    const agregar = () => { setPopupAgregar(true); };
    const cancelarAgregar = () => { setPopupAgregar(false); };

    const [popupAlumnos, setPopupAlumnos] = useState(false);    
    const listaAlumnos = () => { 
        setPopupAgregar(false);
        setPopupAlumnos(true);
    };
    const cancelarAlumnos = () => { setPopupAlumnos(false); };

    return (
        <Fondo>
            <header>
                <Navbar />
            </header>
            <body className="listadoCursos">
                <h1 className="titulo">Listado de cursos</h1>
                <div className="contenido">
                    <p id="cicloLectivo">Ciclo lectivo 2024</p>
                    <div className="listaCursos">
                        <article className="curso">
                            <p id="añoDivision">1°A</p>
                            <div className="accionesCurso">
                                <button onClick={handleAlumnos}>
                                    <img className="icono" src={iconoFlecha} alt="Ícono flecha" />
                                    Ver curso
                                </button>
                                <button onClick={editar}>
                                    <img className="icono" src={iconoEditar} alt="Ícono editar" />
                                    Modificar
                                </button>
                                <button onClick={eliminar}>
                                    <img className="icono" src={iconoEliminar} alt="Ícono eliminar" />
                                    Eliminar
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
              >
                <div className="bodyModal">
                    ¿Está seguro que desea dar de baja el curso <b>1°A - 2024</b>?
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
                    Está <b id="prueba">Editando</b>
                </div>
              </ModalMediano>
            )}
            {popupAlumnos && (
              <ModalGrande 
                titulo="Curso nuevo: Lista de alumnos"
                cerrar={cancelarAlumnos} 
                colorFondo={colors.verde}
              >
                <div className="bodyModal">
                    <p>1° Ingrese la cantidad de alumnos</p>
                    <input type="number"></input>
                    <p>2° Agregue los datos de los alumnos correspondientes a este curso</p>
                </div>
              </ModalGrande>
            )}
            {popupAgregar && (
              <ModalMediano 
                titulo="Agregar un curso nuevo"
                cerrar={cancelarAgregar} 
                colorFondo={colors.violeta}
                aceptar={listaAlumnos}
              >
                <div className="bodyModal">
                    <p id="tituloAltaCurso">Para agregar un curso complete los siguientes datos</p>
                    <form id="formAltaCurso">
                        <div className="input">
                            <label>Nivel</label>
                            <input type="text" />
                        </div>
                        <div className="input">
                            <label>División</label>
                            <input type="text" />
                        </div>
                        <div className="input">
                            <label>Ciclo lectivo</label>
                            <input type="text" />
                        </div>
                    </form>
                </div>
              </ModalMediano>
            )}
        </Fondo>
    );
}

export default ListadoCursos;
