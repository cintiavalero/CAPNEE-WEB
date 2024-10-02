import React from "react";
import colors from "../constants/colors";
import logo from '../assets/logo_capnee_white.png'; 
import iconoUsuario from '../assets/icon-user.png'; 
import iconoSalir from '../assets/icon-salir.png'; 
import { useNavigate } from 'react-router-dom';

export default function NavHorizontal() {  
    const navigate = useNavigate();

    return (
        <div style={StylesNavH.contenedor}>
            <div onClick={() => navigate('/listadocursos')} style={StylesNavH.contenedorLogo}>
                    <img style={StylesNavH.logo}  src={logo} alt="Logo CAPNEE blanco" />
            </div>
            <div style={StylesNavH.contenedorAccionesSesion}>
                <button style={StylesNavH.accion} onClick={() => navigate('/perfil')}>
                    <img style={StylesNavH.icono} src={iconoUsuario} alt="Ícono de usuario" /> 
                    <span style={StylesNavH.usuario}>Cintia Valero</span>  
                </button>
                <button style={StylesNavH.accion} onClick={() => navigate('/')}>
                    <img style={StylesNavH.icono} src={iconoSalir} alt="Ícono de usuario" /> 
                    <span style={StylesNavH.usuario}>Cerrar sesión</span>  
                </button>
            </div>
        </div>
    );
}

const StylesNavH = {
    contenedorAccionesSesion: {
        display:'flex',
        justifyContent: 'center',
        alignItems:'center',
        marginRight: '25px',

    },
    accion:{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center', 
    },
    icono: {
        height: '30px', 
    },
    usuario: {
        fontWeight: '500', 
        marginRight: '10px',
        color: colors.blanco, 
    },
    contenedor: {
        backgroundColor: colors.violeta,
        height: '70px',
        display: 'flex',
        justifyContent: 'space-between',
    },
    contenedorLogo: {
        display: 'flex',
        marginLeft: '25px',
    },
    logo: {
        pointer: 'cursor',
    }
};
