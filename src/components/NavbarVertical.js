import React from "react";
import colors from "../constants/colors";
import logo from '../assets/logo_capnee_white.png'; 
import iconoUsuario from '../assets/icon-user.png'; 
import iconoSalir from '../assets/icon-salir.png';
import iconoCurso from '../assets/icon-book.png'; 
import { useNavigate } from 'react-router-dom';

export default function NavVertical() {  
    const navigate = useNavigate();

    return (
        <div style={stylesNavV.contenedor}>
            <div style={stylesNavV.contenedorLogo}>
                <img src={logo} alt="Logo CAPNEE blanco" style={stylesNavV.logo} />
            </div>
            <div style={stylesNavV.acciones}>
                <button style={stylesNavV.accion} onClick={() => navigate('/gestionalumnos')}>
                    <img style={stylesNavV.icono} src={iconoCurso} alt="Ícono de curso" /> 
                    <span style={stylesNavV.usuario}>Curso y división</span>  
                </button>
                <button style={stylesNavV.accion} onClick={() => navigate('/perfil')}>
                    <img style={stylesNavV.icono} src={iconoUsuario} alt="Ícono de usuario" /> 
                    <span style={stylesNavV.usuario}>Nombre Apellido</span>  
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
        },
};
