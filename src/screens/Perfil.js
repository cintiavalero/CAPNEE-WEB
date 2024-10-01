import React, { useState } from "react";
import Fondo from "../components/FondoB";
import Navbar from "../components/NavbarHorizontal";
import "./Styles/Perfil.css";
import "./general.css";
import construccion from '../assets/contruccion.png'; 

function Perfil() {
    return (
        <Fondo>
            <header>
                <Navbar/>
            </header>
            <body>
                    <h1>En construcción</h1>
                    <img id="contruccion" src={construccion} alt="contruccion" />
            </body>
        </Fondo>
    );
}

export default Perfil;
