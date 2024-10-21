import React from "react";
import iconoFlecha from '../assets/icon-flecha.png';
import iconoEditar from '../assets/icon-editar.png';
import iconoEliminar from '../assets/icon-trash.png';
import "../screens/Styles/ListadoCursos.css";
import "../screens/general.css";

export default function CursoCard({ añoDivision, handleVerCurso, handleEditar, handleEliminar }) {

    return (
        <article className="curso">
        <p id="añoDivision">{añoDivision}</p>
            <div className="accionesCurso">
                <button onClick={handleVerCurso}>
                    <img className="icono" src={iconoFlecha} alt="Ícono flecha" />
                    Ver curso
                </button>
                <button onClick={handleEditar}>
                    <img className="icono" src={iconoEditar} alt="Ícono editar" />
                    Modificar
                </button>
                <button onClick={handleEliminar}>
                    <img className="icono" src={iconoEliminar} alt="Ícono eliminar" />
                    Eliminar
                </button>
            </div>
        </article>
    )

}