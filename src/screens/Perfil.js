import React, { useState, useEffect } from "react";
import Fondo from "../components/FondoB";
import Navbar from "../components/NavbarVertical";
import fotoAlumno from "../assets/alumno.jpg"
import fotoAlumna from "../assets/alumna.jpg"
import "./Styles/Perfil.css";
import { useNavigate, useParams } from 'react-router-dom';
import "./general.css";
import axios from "axios";
const API_URL = 'http://149.50.140.55:8081';

function Perfil() {

    const [alumno, setAlumno] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
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

    const { idCurso, idUsuario } = useParams();
    const token = localStorage.getItem('token');

    // Petición para obtener información de un alumno específico
    const getAlumnoById = async (id) => {
        try {
            const response = await axios.get(`${API_URL}/person/get-by-id?id=${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setAlumno(response.data);
            setLoading(false);
        } catch (error) {
            setError('Error al cargar la información del alumno');
            setLoading(false);
        }
    };

    useEffect(() => {
        getAlumnoById(idUsuario); // Usar el idUsuario del parámetro de la URL
    }, [idUsuario]);

  
    return (
        <Fondo>
             <div className="header-vertical">
                <Navbar/>
            </div>
            <body className="perfil">
                <h1 className="titulo">Perfil y estado académico</h1>

                <div className="tarjeta-perfil">
                    <div className="imagen-perfil">
                        {}
                        <img src={alumno?.photo || fotoAlumno} alt="Foto de perfil" /> 
                    </div>
                    <div className="info-perfil">
                        <h2>{alumno ? `${alumno.name} ${alumno.lastName}` : "Sin información"}</h2>
                        <p><b>Usuario: </b> {alumno?.username || "Sin información"}</p>
                        <p><b>DNI: </b> {alumno?.dni || "Sin información"}</p>
                        <p><b>Fecha de nacimiento: </b> {alumno?.birthdate || "Sin información"}</p>
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
                                            <th>Tiempo</th>
                                            <th>Calificación</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>Conteo de números</td>
                                            <td>Si</td>
                                            <td>1</td>
                                            <td>10s</td>
                                            <td>5⭐</td>
                                        </tr>
                                        <tr>
                                            <td>Suma de números naturales</td>
                                            <td>No</td>
                                            <td>2</td>
                                            <td>4,3s</td>
                                            <td>0⭐</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <li>Contexto y uso de los números</li>
                            <div className="tabla-academica">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Ejercicio</th>
                                            <th>Resuelto</th>
                                            <th>Intentos</th>
                                            <th>Tiempo</th>
                                            <th>Calificación</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>Conteo de números</td>
                                            <td>Si</td>
                                            <td>1</td>
                                            <td>10s</td>
                                            <td>5⭐</td>
                                        </tr>
                                        <tr>
                                            <td>Suma de números naturales</td>
                                            <td>No</td>
                                            <td>2</td>
                                            <td>4,3s</td>
                                            <td>0⭐</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
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
