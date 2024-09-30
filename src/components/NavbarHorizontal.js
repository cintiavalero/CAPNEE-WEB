import React from "react";
import colors from "../constants/colors";
import logo from '../assets/logo_capnee_white.png'; 
import iconoUsuario from '../assets/icon-user.png'; 

export default function NavHorizontal() {  
    return (
        <div style={StylesNavH.contenedor}>
            <div style={StylesNavH.contenedorLogo}>
                <img  src={logo} alt="Logo CAPNEE blanco" />
            </div>
            <div style={StylesNavH.contenedorUsuario}>
                <span style={StylesNavH.usuario}>Nombre Apellido</span>  
                <img style={StylesNavH.iconoUsuario} src={iconoUsuario} alt="Ícono de usuario" /> 
            </div>
        </div>
    );
}

const StylesNavH = {
    iconoUsuario: {
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
        widht:'50%',
        display: 'flex',
        justifyContent: 'space-between',
    },
    contenedorLogo: {
        display: 'flex',
        marginLeft: '25px',
        widht:'50%',
    },
    contenedorUsuario: {
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center', 
        marginRight: '25px',
        widht:'50%'
    },
};
