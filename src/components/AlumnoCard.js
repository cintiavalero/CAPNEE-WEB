import React from "react";
import iconoFlecha from '../assets/icon-flecha.png';
import iconoEditar from '../assets/icon-editar.png';
import iconoEliminar from '../assets/icon-trash.png';
import "../screens/Styles/GestionAlumnos.css";
import "../screens/general.css";

export default function AlumnoCard({nombre, usuario, dni, fechaNacimiento, handleVerAlumno, handleEditar, handleEliminar}) {
    return(
        <article className="alumno">
            <div className="datosAlumno">
                <div className="datosUsuarioAlumno">
                    <p><b>{nombre}</b></p>
                    <small>Usuario: {usuario}</small>
                </div>
                <div className="datosPersonalesAlumno">
                    <p><b>DNI: </b>{dni}</p>
                    <p><b>Nacimiento: </b>{fechaNacimiento}</p>
                </div>
            </div>
            <div className="accionesAlumno">
                <button onClick={handleVerAlumno}>
                    <img className="icono" src={iconoFlecha} alt="Ícono flecha" /> 
                    Perfil
                </button>
                <button onClick={handleEditar}>
                    <img className="icono" src={iconoEditar} alt="Ícono editar" /> 
                    Modificar
                </button>
                <button onClick={handleEliminar}>
                    <img className="icono" src={iconoEliminar} alt="Ícono eliminar" />                                     
                    Desvincular
                </button>
            </div>
        </article>
    )
}