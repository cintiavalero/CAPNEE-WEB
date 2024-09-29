import React from "react";
import colors from "../constants/colors";
import logo from '../assets/logo_capnee_white.png'; 
import iconoUsuario from '../assets/icon-user.png'; 
import iconoCurso from '../assets/icon-book.png'; 

export default function NavVertical() {  
    return (
        <div style={styles.contenedor}>
            <div style={styles.contenedorLogo}>
                <img src={logo} alt="Logo CAPNEE blanco" style={styles.logo} />
            </div>
            <div>
                <div style={styles.contenedorUsuario}>
                    <img style={styles.icono} src={iconoCurso} alt="Ícono de curso" /> 
                    <span style={styles.usuario}>Curso y división</span>  
                </div>
                <div style={styles.contenedorCurso}>
                    <img style={styles.icono} src={iconoUsuario} alt="Ícono de usuario" /> 
                    <span style={styles.usuario}>Nombre Apellido</span>  
                </div>
            </div>
        </div>
    );
}

const styles = {
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
