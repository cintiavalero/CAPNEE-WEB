import React, { useState } from "react";
import Fondo from "../components/FondoB";
import Navbar from "../components/NavbarVertical";
import "./Styles/Perfil.css";
import "./general.css";

function Perfil() {
    const [openSections, setOpenSections] = useState({
        numerosNaturales: false,
        operacionesNumerosNaturales: false,
        medida: false,
    });

    const toggleSection = (section) => {
        setOpenSections((prevState) => ({
            ...prevState,
            [section]: !prevState[section],
        }));
    };
    return (
        <Fondo>
             <div className="header-vertical">
                <Navbar/>
            </div>
            <body className="perfil">
                <h1 className="titulo">Perfil y estado académico</h1>
                <div class="tarjeta-perfil">
                    <div class="imagen-perfil">
                        <image src="" alt="Foto de perfil"></image>
                    </div>
                    <div class="info-perfil">
                        <h2>Cintia Valero - 1ºA 2024</h2>
                        <p>Usuario: cintiav</p>
                        <p>DNI: 43042670</p>
                        <p>Fecha de nacimiento: 06/06/2001</p>
                    </div>
                </div>

                   {/* Secciones desplegables */}
                   <div className="secciones">
                    <div onClick={() => toggleSection("numerosNaturales")} className="seccion-titulo">
                        <span className={`viñeta ${openSections.numerosNaturales ? 'abierta' : ''}`}></span>
                        Números naturales
                    </div>
                    {openSections.numerosNaturales && (
                        <ul>
                            <li>Usar y conocer los números</li>
                            <div className="tabla-academica">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Ejercicio</th>
                                            <th>Resuelto</th>
                                            <th>Intentos</th>
                                            <th>Tiempos</th>
                                            <th>Calificación</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>1</td>
                                            <td>Cintia Milagros</td>
                                            <td>06/06/2001</td>
                                            <td>43397816</td>
                                            <td>pochoclo</td>
                                        </tr>
                                        <tr>
                                            <td>2</td>
                                            <td>Juan Ignacio</td>
                                            <td>15/03/2001</td>
                                            <td>43748237</td>
                                            <td>juani</td>
                                        </tr>
                                        <tr>
                                            <td>3</td>
                                            <td>Franco Ezequiel</td>
                                            <td>21/11/2000</td>
                                            <td>42347566</td>
                                            <td>borse</td>
                                        </tr>
                                        <tr>
                                            <td>4</td>
                                            <td>Nombre...</td>
                                            <td>Apellido...</td>
                                            <td>Fecha...</td>
                                            <td>DNI...</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <li>Contexto y uso de los números</li>
                            <li>Números de varias cifras</li>
                        </ul>
                    )}
                    <div onClick={() => toggleSection("operacionesNumerosNaturales")} className="seccion-titulo">
                        <span className={`viñeta ${openSections.operacionesNumerosNaturales ? 'abierta' : ''}`}></span>
                        Operaciones con números naturales
                    </div>
                    {openSections.operacionesNumerosNaturales && (
                        <ul>
                            <li>Operaciones básicas</li>
                            <li>Propiedades de las operaciones</li>
                        </ul>
                    )}
                    <div onClick={() => toggleSection("medida")} className="seccion-titulo">
                        <span className={`viñeta ${openSections.medida ? 'abierta' : ''}`}></span>
                        Medida
                    </div>
                    {openSections.medida && (
                        <ul>
                            <li>Unidades de medida</li>
                            <li>Conversión de unidades</li>
                        </ul>
                    )}
                </div>
            </body>
        </Fondo>
    );
}

export default Perfil;
