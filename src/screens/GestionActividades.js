import React, { useEffect, useState } from "react";
import Fondo from "../components/FondoB";
import Navbar from "../components/NavbarVertical";
import ActividadCard from "../components/ActividadCard";
import "./general.css";
import "./Styles/GestionActividades.css";

import { useNavigate, useParams } from 'react-router-dom';
import axios from "axios";

const API_URL = 'http://149.50.140.55:8082';

function GestionActividades() {
    const [nombreSubBloque, setNombreSubBloque] = useState('');
    const [actividades, setActividades] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);    
    const navigate = useNavigate();

    //Recuperar parámetros de ruta
    const { idCurso, idSubBloque } = useParams();

    //Recuperar token
    const token = localStorage.getItem('token');

    //Petición para obtener actividades
    const getActividades = async () => {
        try {
            const response = await axios.get(`${API_URL}/thematic-content/get-all-by-thematic-subblock-id-and-course-id?thematicSubblockId=${idSubBloque}&courseId=${idCurso}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setActividades(response.data.thematicContents);
            setNombreSubBloque(response.data.thematicSubblock);
            setLoading(false);
        } catch (error) {
            setError('Error al cargar las actividades');
            setLoading(false);
        }
    };

    useEffect(() => {
        getActividades();
    }, []);

    return (
        <Fondo >
            <div className="header-vertical">
                <Navbar/>
            </div>
            <body className="gestionActividades">
                <h1 className="titulo">Administración de actividades del curso</h1>
                <h2><b>{nombreSubBloque}:</b> Selecione una actividad</h2>
                <div className="contenido">
                    <div className="listaActividades">
                        {loading ? <p>Cargando Actividades</p> : <p> </p>}
                        {actividades.map((actividad) => (
                            <ActividadCard
                                key={actividad.id}
                                titulo={actividad.name}
                                rutaDestino={`/gestionejercicios/curso/${idCurso}/actividad/${actividad.id}`}
                                cantidadEjercicios={actividad.numberOfAssociatedExercises}
                            />
                        ))}
                    </div>
                </div>
            </body>
        </Fondo>
    );
}

export default GestionActividades;
