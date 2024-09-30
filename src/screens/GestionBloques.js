import React from "react";
import Fondo from "../components/FondoB";
import Navbar from "../components/NavbarVertical";
import "./general.css";
import "./Styles/GestionBloques.css";
import numerosNaturales from '../assets/numerosNaturales.png'; 

function GestionBloques() {
    return (
        <Fondo >
            <div className="header-vertical">
                <Navbar/>
            </div>
            <body className="gestionBloques">
                <h1 className="titulo">Administración de actividades del curso</h1>
                <h2>Por favor, seleccione un bloque temático</h2>
                <div className="contenido">
                    <div className="listaBloques">
                        <article className="bloque">
                            <div className="imagenBloque">
                                <img src={numerosNaturales} alt="Números naturales" /> 
                            </div>
                            <div className="tituloBloque">
                               <p>Números naturales</p>
                            </div>
                        </article>
                        <article className="bloque">
                            <div className="imagenBloque">
                                <img src={numerosNaturales} alt="Números naturales" /> 
                            </div>
                            <div className="tituloBloque">
                               <p>Números naturales</p>
                            </div>
                        </article>
                        <article className="bloque">
                            <div className="imagenBloque">
                                <img src={numerosNaturales} alt="Números naturales" /> 
                            </div>
                            <div className="tituloBloque">
                               <p>Números naturales</p>
                            </div>
                        </article>
                    </div>
                </div>
            </body>
        </Fondo>
    );
}

export default GestionBloques;
