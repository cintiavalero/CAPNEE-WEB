import React from "react";
import colors from "../constants/colors";
import Aceptar from "./BotonAceptar"; // Asegúrate de que la ruta sea correcta

export default function ModalMediano() {  
    return (
        <div style={styles.fondo}>
            <div style={styles.contenedorModal}>
                <div style={styles.headerModal}>
                    <p style={styles.titulo}>Titulo modal</p>
                    <button style={styles.cerrar}>X</button>
                </div>
                <div style={styles.bodyModal}>
                    <p>Contenido del modal</p>
                </div>
                <div style={styles.footerModal}>
                    <Aceptar/>
                </div>
            </div>
        </div>
    );
}

const styles = {
    cerrar:{
        display:'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.violeta,
        color: colors.blanco,
        border: 'none',
        cursor: 'pointer',
        fontSize: '15px',
        marginRight: '20px',
    },
    titulo:{
        marginLeft: '20px',
        fontWeight: 'bold', 
    },
    fondo: {
        backgroundColor: 'rgba(0, 0, 0, 0.7)', 
        width: '100vw', 
        height: '100vh', 
        display:'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    contenedorModal: {
        backgroundColor: colors.blanco, 
        borderRadius: '10px',
        width: '550px',
        height: '330px', 
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',

    },
    headerModal: {
        borderRadius: '10px 10px 0 0',
        backgroundColor: colors.violeta, 
        width: '100%', 
        height: '40px', 
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    bodyModal: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
    },
    footerModal: {
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        textAlign: 'center',
        padding: '20px',
    },
};
