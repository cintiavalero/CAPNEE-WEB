import React, { useEffect, useState } from "react";
import Fondo from "../components/FondoB";
import Navbar from "../components/NavbarVertical";
import Carta from "../components/BloqueCard";
import "./general.css";
import "./Styles/GestionBloques.css";
import { useNavigate, useParams } from 'react-router-dom';
import axios from "axios";

//Imagenes
import numerosNaturales from '../assets/bloque-numerosNaturales.png'; 
import operacioesConN from '../assets/bloque-operacionesconN.png'; 
import medida from '../assets/bloque-medida.png'; 
import geometria from '../assets/bloque-geometria.png'; 
import espacio from '../assets/bloque-espacio.png';

const imagenes = [numerosNaturales, operacioesConN, medida, geometria, espacio];

const API_URL = 'http://149.50.140.55:8082';

function GestionBloques() {
    const [bloques, setBloques] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    //Recuperar id de curso
    const { idCurso } = useParams();

    //Recuperar token
    const token = localStorage.getItem('token');

    //Petición para obtener bloques
    const getBloques = async () => {
        try {
            const response = await axios.get(`${API_URL}/thematic-blocks/get-all-by-course?id=${idCurso}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setBloques(response.data);
            setLoading(false);
        } catch (error) {
            setError('Error al cargar los bloques');
            setLoading(false);
        }
    };

    useEffect(() => {
        getBloques();
    }, []);

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
                        {loading ? <p>Cargando Bloques</p> : <p> </p>}
                        {bloques.map((bloque, index) => (
                            <Carta
                                key={bloque.id}
                                imagen={imagenes[index % imagenes.length]}
                                titulo={bloque.name}
                                rutaDestino={`/gestionSubbloques/${idCurso}/${bloque.id}`}
                            />
                        ))}
                    </div>
                </div>
            </body>
        </Fondo>
    );
}

export default GestionBloques;
