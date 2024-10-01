import React from "react";
import colors from "../constants/colors";


const BotonGuardar = ({ onClick }) => {
    return (
        <button style={styles.boton} onClick={onClick}>
            Guardar
        </button>
    );
};

const styles = {
    boton: {
        display:'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.gris,
        color: colors.blanco, 
        border: 'none',
        borderRadius: '5px',
        padding: '5px 35px',
        cursor: 'pointer',
        fontSize: '15px',
        transition: 'background-color 0.3s',
    },
};

export default BotonGuardar;
