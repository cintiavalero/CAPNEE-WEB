import React, { useState } from "react";
import Fondo from "../components/FondoB";
import Navbar from "../components/NavbarHorizontal";
import Agregar from "../components/BotonAgregar";
import ModalChico from "../components/ModalChico"; 
import ModalMediano from "../components/ModalMediano"; 
import ModalGrande from "../components/ModalGrande"; 
import "./Styles/ListadoCursos.css";
import "./general.css";
import iconoFlecha from '../assets/icon-flecha.png'; 
import iconoEditar from '../assets/icon-editar.png'; 
import iconoEliminar from '../assets/icon-trash.png'; 
import construccion from '../assets/contruccion.png'; 
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
                    <p>
                      ¿Está seguro que desea dar de baja el curso <b>1°A - 2024</b>?
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
                  <div id="headCurso" className="introduccion">
                    <p>Está modificando los datos del curso:<b> 1° A</b></p>
                  </div>
                  <form id="formCurso">
                    <div className="input">
                      <label>Año</label>
                      <select>
                        <option value="" disabled>Seleccione</option>
                        <option value="1" selected>Nivel 1</option>
                        <option value="2">Nivel 2</option>
                      </select>
                    </div>
                    <div className="input">
                      <label>División</label>
                      <select>
                        <option value="" disabled>Seleccione</option>
                        <option value="A" selected>A</option>
                        <option value="B">B</option>
                      </select>
                    </div>
                    <div className="input">
                      <label>Ciclo Lectivo</label>
                      <select>
                        <option value="" disabled >Seleccione</option>
                        <option value="2023">2023</option>
                        <option value="2024" selected>2024</option>
                      </select>
                    </div>
                  </form>
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
                    <h1>En construcción</h1>
                    <img id="contruccion" src={construccion} alt="contruccion" />
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
                  <div id="headCurso" className="introduccion">
                    <p>Para agregar un curso complete los siguientes datos:</p>
                  </div>
                  <form id="formCurso">
                    <div className="input">
                      <label>Año</label>
                      <select>
                        <option value="" disabled selected>Seleccione</option>
                        <option value="1">Nivel 1</option>
                        <option value="2">Nivel 2</option>
                      </select>
                    </div>
                    <div className="input">
                      <label>División</label>
                      <select>
                        <option value="" disabled selected>Seleccione</option>
                        <option value="A">A</option>
                        <option value="B">B</option>
                      </select>
                    </div>
                    <div className="input">
                      <label>Ciclo Lectivo</label>
                      <select>
                        <option value="" disabled selected>Seleccione</option>
                        <option value="2023">2023</option>
                        <option value="2024">2024</option>
                      </select>
                    </div>
                  </form>
                </div>
              </ModalMediano>
            )}
        </Fondo>
    );
}

export default ListadoCursos;
