import React from "react";
import colors from "../constants/colors";
import logo from '../assets/logo_capnee_white.png'; 
import iconoUsuario from '../assets/icon-user.png'; 

export default function NavHorizontal() {  
    return (
        <div style={styles.contenedor}>
            <div style={styles.contenedorLogo}>
                <img  src={logo} alt="Logo CAPNEE blanco" />
            </div>
            <div style={styles.contenedorUsuario}>
                <span style={styles.usuario}>Nombre Apellido</span>  
                <img style={styles.iconoUsuario} src={iconoUsuario} alt="Ícono de usuario" /> 
            </div>
        </div>
    );
}

const styles = {
    iconoUsuario: {
        height: '30px', 
    },
    usuario: {
        fontWeight: '500', 
        marginRight: '10px',
    },
    contenedor: {
        backgroundColor: colors.violeta,
        height: '70px',
        display: 'flex',
        justifyContent: 'space-between',
    },
    contenedorLogo: {
        display: 'flex',
        marginLeft: '10px',
    },
    contenedorUsuario: {
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center', 
        marginRight: '10px',
    },
};
