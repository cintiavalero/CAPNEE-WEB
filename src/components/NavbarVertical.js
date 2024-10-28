import React, { useEffect, useState } from "react";
import colors from "../constants/colors";
import logo from '../assets/logo_capnee_white.png'; 
import iconoUsuario from '../assets/icon-user.png'; 
import iconoSalir from '../assets/icon-salir.png';
import iconoCurso from '../assets/icon-book.png'; 
import { useNavigate, useParams } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";

export default function NavVertical() {
    const [usuario, setUsuario] = useState('');    
    const navigate = useNavigate();

    const token = localStorage.getItem('token');

    //Recuperar id de curso
    const { idCurso } = useParams();

    useEffect(() => {
        if (token) {
          try {
            const decodedToken = jwtDecode(token);
            setUsuario(decodedToken.name);
          } catch (error) {
            console.log('Token inválido.')
          }
        }
      }, []);

    return (
        
        <div style={stylesNavV.contenedor}>
            <div onClick={() => navigate('/listadocursos')} style={stylesNavV.contenedorLogo}>
                <img src={logo} alt="Logo CAPNEE blanco" style={stylesNavV.logo} />
            </div>
            <div style={stylesNavV.acciones}>
                <button style={stylesNavV.accion} onClick={() => navigate(`/gestionbloques/${idCurso}`)}>
                    <img style={stylesNavV.icono} src={iconoCurso} alt="Ícono de curso" /> 
                    <span style={stylesNavV.usuario}>Ejercicios</span>  
                </button>
                <button style={stylesNavV.accion} onClick={() => navigate('/perfil')}>
                    <img style={stylesNavV.icono} src={iconoUsuario} alt="Ícono de usuario" /> 
                    <span style={stylesNavV.usuario}>{usuario}</span>  
                </button>
                <button style={stylesNavV.accion} onClick={() => navigate('/')}>
                    <img style={stylesNavV.icono} src={iconoSalir} alt="Ícono de usuario" /> 
                    <span style={stylesNavV.usuario}>Cerrar sesión</span>  
                </button>
            </div>
        </div>
    );
}

const stylesNavV = {
    icono: {
        height: '35px', 
        marginRight: '10px',
    },
    usuario: {
        fontWeight: 'bold', 
        color: 'white', 
        textAlign: 'center',
        fontSize: '18px',
    },
    contenedor: {
        backgroundColor: colors.violeta, 
        height: '100vh',
        width: '250px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'fixed',
    },
    contenedorLogo: {
        display: 'flex',
        alignItems: 'center',
        marginTop:'30px',
    },
    acciones: {
        display: 'flex',
        alignItems: 'center',
        justifyContent:'center',
        flexDirection: 'column',
        marginBottom: '10px',
        width: '100%',
    },
    accion: {
        display: 'flex',
        alignItems: 'center', 
        justifyContent:'center',
        marginBottom: '10px',
        width: '100%',
    },
    logo: {
        height: '90px', 
        cursor:'pointer',
        },
};
