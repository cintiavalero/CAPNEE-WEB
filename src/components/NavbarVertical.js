import React, { useEffect, useState } from "react";
import colors from "../constants/colors";
import logo from '../assets/logo_capnee_white.png'; 
import iconoUsuario from '../assets/icon-user.png'; 
import iconoUsuarios from '../assets/icon-users.png'; 
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
                <div style={stylesNavV.gestiones}>
                    <button style={stylesNavV.gestion} onClick={() => navigate(`/gestionalumnos/curso/${idCurso}`)}>
                        <img style={stylesNavV.icono} src={iconoUsuarios} alt="Ícono de curso" /> 
                        <span style={stylesNavV.usuario}>Alumnos</span>  
                    </button>
                    <button style={stylesNavV.gestion} onClick={() => navigate(`/gestionbloques/curso/${idCurso}`)}>
                        <img style={stylesNavV.icono} src={iconoCurso} alt="Ícono de curso" /> 
                        <span style={stylesNavV.usuario}>Ejercicios</span>  
                    </button>
                </div>
                <div>
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
    gestiones: {
        display: 'flex',
        gap: '10px',
        flexDirection: 'column',
        width: '100%',
        padding: '0 20px',
    },
    gestion: {
        display: 'flex',
        alignItems: 'center', 
        justifyContent:'center',
        marginBottom: '10px',
        width: '100%',
        height: '50px',
        borderRadius: '15px',
        backgroundColor: colors.verde, 
        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
        cursor: 'pointer',
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
        justifyContent:'space-between',
        flexDirection: 'column',
        marginBottom: '10px',
        width: '100%',
        height: '100%',
        paddingTop: '80px',
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
