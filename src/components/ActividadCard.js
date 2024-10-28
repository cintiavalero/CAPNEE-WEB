import React from "react";
import "../screens/general.css";
import "../screens/Styles/GestionActividades.css";
import iconoEjercicio from '../assets/icon-book.png'; 

import { useNavigate } from "react-router-dom";

export default function ActividadCard({titulo, rutaDestino, cantidadEjercicios}) {
    const navigate = useNavigate();

    return (
        <article className="actividad" onClick={() => navigate(rutaDestino)}>
            <p>{titulo}</p>
            <div className="cantidadEjercicios">
                <img src={iconoEjercicio} alt="Icono de libro"/> 
                <p>Ejercicios: {cantidadEjercicios}</p>
            </div>
        </article>
    )
}