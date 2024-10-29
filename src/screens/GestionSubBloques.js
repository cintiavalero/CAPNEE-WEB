import React, { useEffect, useState } from "react";
import Fondo from "../components/FondoB";
import Navbar from "../components/NavbarVertical";
import Carta from "../components/BloqueCard";
import "./general.css";
import "./Styles/GestionSubBloques.css";

import { useNavigate, useParams } from 'react-router-dom';
import axios from "axios";

//Imagenes
import subbloque1 from '../assets/subbloque1.png'; 
import subbloque2 from '../assets/subbloque2.png'; 
import subbloque3 from '../assets/subbloque3.png';

const imagenes = [subbloque1, subbloque2, subbloque3];
 
const API_URL = 'http://149.50.140.55:8082';

function GestionSubBloques() {
    const [nombreBloque, setNombreBloque] = useState('');
    const [subBloques, setSubBloques] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    //Recuperar parámetros de ruta
    const { idCurso, idBloque } = useParams();

    //Recuperar token
    const token = localStorage.getItem('token');

    //Petición para obtener sub-bloques
    const getSubBloques = async () => {
        try {
            const response = await axios.get(`${API_URL}/thematic-subblocks/get-all-by-course-and-thematic-block?courseId=${idCurso}&thematicBlockId=${idBloque}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setSubBloques(response.data.subBlocks);
            setNombreBloque(response.data.thematicBlock)
            setLoading(false);
        } catch (error) {
            setError('Error al cargar los bloques');
            setLoading(false);
        }
    };

    useEffect(() => {
        getSubBloques();
    }, []);

    return (
        <Fondo >
            <div className="header-vertical">
                <Navbar/>
            </div>
            <body className="gestionSubBloques">
                <h1 className="titulo">Administración de actividades del curso</h1>
                <h2><b>{nombreBloque}:</b> Seleccione un tema</h2>
                <div className="contenido">
                    <div className="listaBloques">
                        {loading ? <p>Cargando Sub-bloques</p> : <p> </p>}
                        {subBloques.map((subBloque, index) => (
                            <Carta
                                key={subBloque.id}
                                imagen={imagenes[index % imagenes.length]}
                                titulo={subBloque.name}
                                rutaDestino={`/gestionactividades/curso/${idCurso}/sub-bloque/${subBloque.id}`}
                            />
                        ))}
                    </div>
                </div>
            </body>
        </Fondo>
    );
}

export default GestionSubBloques;
