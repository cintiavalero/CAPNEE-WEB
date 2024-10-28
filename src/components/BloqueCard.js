import React from "react";
import "../screens/general.css"
import "../screens/Styles/GestionBloques.css";
import { useNavigate } from 'react-router-dom';

export default function Carta({imagen, titulo, rutaDestino}) {
    const navigate = useNavigate();
    
    return(
        <article className="bloque"
            onClick={() => navigate(rutaDestino)}
        >
            <div className="imagenBloque">
                <img src={imagen} alt={titulo} /> 
            </div>
            <div className="tituloBloque">
                <p>{titulo}</p>
            </div>
        </article>
    );
}