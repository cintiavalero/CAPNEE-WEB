import React, { useState, useEffect } from "react";
import Fondo from "../components/FondoB";
import Navbar from "../components/NavbarVertical";
import fotoAlumno from "../assets/alumno.jpg"
import "./Styles/Perfil.css";
import { useParams } from 'react-router-dom';
import "./general.css";
import axios from "axios";

const API_URL_O = 'http://149.50.140.55:8081';
const API_URL_T = 'http://149.50.140.55:8082';


function Perfil() {

    const [alumno, setAlumno] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [openSections, setOpenSections] = useState({
        numerosNaturales: false,
        operacionesNumerosNaturales: false,
        medida: false,
    });
    const [bloques, setBloques] = useState(null);
    const { idUsuario } = useParams();
    const token = localStorage.getItem('token');

    // Desplegar bloque
    const toggleSection = (section) => {
        setOpenSections((prevState) => ({
            ...prevState,
            [section]: !prevState[section],
        }));
    };

    // Petición para obtener información de un alumno específico
    const getAlumnoById = async (id) => {
        try {
            const response = await axios.get(`${API_URL_O}/person/get-by-id?id=${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setAlumno(response.data);
            setLoading(false);
            console.log(response)
        } catch (error) {
            setError('Error al cargar la información del alumno');
            setLoading(false);
        }
    };

    // Función para obtener los detalles académicos
    const getDetalleAcademico = async (id) => {
        try {
            const response = await axios.get(`${API_URL_T}/exercises-students/academic-details-by-student?studentId=${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setBloques(response.data.thematicBlocks);
            setLoading(false);
            console.log(response)
        } catch (error) {
            setError("Error al cargar los detalles académicos");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getAlumnoById(idUsuario);
        getDetalleAcademico(idUsuario);
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

                {/* Secciones dinámicas */}
                <div className="secciones">
                    {bloques &&
                        Object.entries(bloques).map(([blockKey, block]) => (
                            <div key={blockKey} className="bloques">
                                <div onClick={() => toggleSection(blockKey)} className="seccion-titulo">
                                    <span className={`viñeta ${openSections[blockKey] ? "abierta" : ""}`}></span>
                                    {block.name}
                                </div>
                                {openSections[blockKey] && (
                                    <div className="subbloques">
                                        {Object.entries(block.thematicSubBlocks).map(
                                            ([subBlockKey, subBlock]) => (
                                                <div key={subBlockKey}>
                                                    <div onClick={() => toggleSection(`${blockKey}-${subBlockKey}`)}
                                                        className="subbloque-titulo" >
                                                        <span className={`viñeta ${openSections[`${blockKey}-${subBlockKey}`] ? "abierta" : ""}`}
                                                        ></span> {subBlock.name}
                                                    </div>
                                                    {openSections[`${blockKey}-${subBlockKey}`] && (
                                                        <div>
                                                            {Object.entries(subBlock.thematicContents).map(
                                                                ([contentKey, content]) => (
                                                                    <div key={contentKey} className="actividades">
                                                                        <h5>{content.name}</h5>
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
                                                                                    {Object.values(content.exercises).flat().map((exercise) => (
                                                                                        <tr key={exercise.id}>
                                                                                            <td>{exercise.statement}</td>
                                                                                            <td>{exercise.resolved ? "Sí" : "No"}</td>
                                                                                            <td>{exercise.numberOfAttempts}</td>
                                                                                            <td>{exercise.resolutionTime}s</td>
                                                                                            <td>{exercise.score}⭐</td>
                                                                                        </tr>
                                                                                    ))}
                                                                                </tbody>
                                                                            </table>
                                                                        </div>
                                                                    </div>
                                                                )
                                                            )}
                                                        </div>
                                                    )}
                                                </div>
                                            )
                                        )}
                                    </div>
                                )}
                            </div>
                        ))}
                </div>

            </body>
        </Fondo>
    );
}

export default Perfil;
