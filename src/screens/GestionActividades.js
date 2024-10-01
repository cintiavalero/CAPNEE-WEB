import React from "react";
import Fondo from "../components/FondoB";
import Navbar from "../components/NavbarVertical";
import "./general.css";
import "./Styles/GestionActividades.css";
import iconoEjercicio from '../assets/icon-book.png'; 
import { useNavigate } from 'react-router-dom';


function GestionActividades() {
    const navigate = useNavigate();

    return (
        <Fondo >
            <div className="header-vertical">
                <Navbar/>
            </div>
            <body className="gestionActividades">
                <h1 className="titulo">Administración de actividades del curso</h1>
                <h2>Usar y conocer los números: Selecione una actividad</h2>
                <div className="contenido">
                    <div className="listaActividades">
                        <article className="actividad" onClick={() => navigate('/gestionejercicios')}>
                            <p>Contextos y uso social de los números</p>
                            <div className="cantidadEjercicios">
                                <img src={iconoEjercicio} alt="Icono de libro"/> 
                                <p>Ejercicios: 1</p>
                            </div>
                        </article>
                    </div>
                </div>
            </body>
        </Fondo>
    );
}

export default GestionActividades;
