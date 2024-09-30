import React from "react";
import colors from "../constants/colors";
import logo from '../assets/logo_capnee_white.png'; 
import iconoUsuario from '../assets/icon-user.png'; 
import iconoCurso from '../assets/icon-book.png'; 

export default function NavVertical() {  
    return (
        <div style={stylesNavV.contenedor}>
            <div style={stylesNavV.contenedorLogo}>
                <img src={logo} alt="Logo CAPNEE blanco" style={stylesNavV.logo} />
            </div>
            <div>
                <div style={stylesNavV.contenedorUsuario}>
                    <img style={stylesNavV.icono} src={iconoCurso} alt="Ícono de curso" /> 
                    <span style={stylesNavV.usuario}>Curso y división</span>  
                </div>
                <div style={stylesNavV.contenedorCurso}>
                    <img style={stylesNavV.icono} src={iconoUsuario} alt="Ícono de usuario" /> 
                    <span style={stylesNavV.usuario}>Nombre Apellido</span>  
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
        alignItems: 'center', // Centra verticalmente el logo
        marginTop:'30px',
    },
    contenedorUsuario: {
        display: 'flex',
        alignItems: 'center', 
        marginBottom: '10px',
        width: '100%',
    },
    contenedorCurso: {
        display: 'flex',
        alignItems: 'center', 
        marginBottom: '30px',
        width: '100%',
    },
    logo: {
        height: '90px', 
        },
};
