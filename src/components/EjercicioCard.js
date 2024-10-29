import React from "react";
import iconoFlecha from '../assets/icon-flecha.png'; 
import iconoEditar from '../assets/icon-editar.png'; 
import iconoEliminar from '../assets/icon-trash.png'; 

export default function CartaEjercicio({nombre, fecha = 'DD/MM/AAAA', handleVerIntentos, handleEditar, handleEliminar}) {
    return (
        <article className="ejercicio">
            <p>{nombre} - {fecha}</p>
            <div className="accionesEjercicio">
                <button onClick={handleVerIntentos}>
                    <img className="icono" src={iconoFlecha} alt="Ícono flecha" /> 
                </button>
                <button onClick={handleEditar}>
                    <img className="icono" src={iconoEditar} alt="Ícono editar" /> 
                </button>
                <button onClick={handleEliminar}>
                    <img className="icono" src={iconoEliminar} alt="Ícono eliminar" />                                     
                </button>                                    
            </div>
        </article>
    );
}