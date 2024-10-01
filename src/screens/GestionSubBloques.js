import React from "react";
import Fondo from "../components/FondoB";
import Navbar from "../components/NavbarVertical";
import "./general.css";
import "./Styles/GestionSubBloques.css";
import conocerNumeros from '../assets/subbloque1.png'; 
import { useNavigate } from 'react-router-dom';

function GestionSubBloques() {
    const navigate = useNavigate();
    return (
        <Fondo >
            <div className="header-vertical">
                <Navbar/>
            </div>
            <body className="gestionSubBloques">
                <h1 className="titulo">Administración de actividades del curso</h1>
                <h2>Números naturales: seleccione un tema</h2>
                <div className="contenido">
                    <div className="listaBloques">
                        <article className="bloque" onClick={() => navigate('/gestionactividades')}>
                            <div className="imagenBloque">
                                <img src={conocerNumeros} alt="Números naturales" /> 
                            </div>
                            <div className="tituloBloque">
                               <p>Usar y conocer los números</p>
                            </div>
                        </article>
                        <article className="bloque">
                            <div className="imagenBloque">
                                <img src={conocerNumeros} alt="Números naturales" /> 
                            </div>
                            <div className="tituloBloque">
                               <p>Números naturales</p>
                            </div>
                        </article>
                        <article className="bloque">
                            <div className="imagenBloque">
                                <img src={conocerNumeros} alt="Números naturales" /> 
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

export default GestionSubBloques;
