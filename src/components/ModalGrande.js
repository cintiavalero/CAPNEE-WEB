import React from "react";
import colors from "../constants/colors";
import Aceptar from "./BotonAceptar";
import Guardar from "./BotonGuardar";

export default function ModalGrande({  cerrar, titulo, children, colorFondo, aceptar, guardar  }) {  
    return (
        <div style={styles.fondo}>
            <div style={styles.contenedorModal}>
            <div style={{ ...styles.headerModal, backgroundColor: colorFondo || colors.violeta }}>
            <p style={styles.titulo}>{titulo}</p>
            <button onClick={cerrar} style={{ ...styles.cerrar, backgroundColor: colorFondo || colors.violeta }}>X</button>
            </div>
                <div style={styles.bodyModal}>
                    {children}
                </div>
                <div style={styles.footerModal}>
                    <Guardar onClick={guardar}/>
                    <Aceptar colorFondo={colorFondo} onClick={aceptar}/>
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
        position:'absolute',
    },
    contenedorModal: {
        backgroundColor: colors.blanco, 
        borderRadius: '10px',
        width: '900px',
        height: '500px', 
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
        flexGrow:'1',
        width:'100%',
    },
    footerModal: {
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        textAlign: 'center',
        padding: '20px',
        gap: '10px',
    },
};
