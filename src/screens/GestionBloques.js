import React from "react";
import Fondo from "../components/FondoB";
import Navbar from "../components/NavbarVertical";
import "./general.css";
import "./Styles/GestionBloques.css";
import numerosNaturales from '../assets/bloque-numerosNaturales.png'; 
import operacioesConN from '../assets/bloque-operacionesconN.png'; 
import medida from '../assets/bloque-medida.png'; 
import geometria from '../assets/bloque-geometria.png'; 
import espacio from '../assets/bloque-espacio.png'; 

import { useNavigate } from 'react-router-dom';


function GestionBloques() {
    const navigate = useNavigate();

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
                        <article className="bloque" onClick={() => navigate('/gestionsubbloques')}>
                            <div className="imagenBloque">
                                <img src={numerosNaturales} alt="Números naturales" /> 
                            </div>
                            <div className="tituloBloque">
                               <p>Números naturales</p>
                            </div>
                        </article>
                        <article className="bloque">
                            <div className="imagenBloque">
                                <img src={operacioesConN} alt="Operaciones con N" /> 
                            </div>
                            <div className="tituloBloque">
                               <p>Operaciones con números naturales</p>
                            </div>
                        </article>
                        <article className="bloque">
                            <div className="imagenBloque">
                                <img src={medida} alt="Medida" /> 
                            </div>
                            <div className="tituloBloque">
                               <p>Medida</p>
                            </div>
                        </article>
                        <article className="bloque">
                            <div className="imagenBloque">
                                <img src={geometria} alt="Geometria" /> 
                            </div>
                            <div className="tituloBloque">
                               <p>Geometría</p>
                            </div>
                        </article>
                        <article className="bloque">
                            <div className="imagenBloque">
                                <img src={espacio} alt="espacio" /> 
                            </div>
                            <div className="tituloBloque">
                               <p>Espacio</p>
                            </div>
                        </article>
                    </div>
                </div>
            </body>
        </Fondo>
    );
}

export default GestionBloques;
