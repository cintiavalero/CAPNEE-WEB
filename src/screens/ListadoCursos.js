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

function ListadoCursos() {

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
                                <button onClick={ver}>
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
                    <Agregar onClick={editar}/>
                </div>
            </body>
            {popupEliminar && <ModalChico cerrar={cancelarEliminar} />}
            {popupEditar && <ModalMediano cerrar={cancelarEditar} />}
            {popupVer && <ModalGrande cerrar={cancelarVer} />}
            {popupAgregar && <ModalMediano cerrar={cancelarAgregar} />}
        </Fondo>
    );
}

export default ListadoCursos;
