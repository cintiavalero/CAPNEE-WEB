import React from "react";
import colors from "../constants/colors";

const BotonAceptar = ({ onClick, colorFondo }) => {
    return (
        <button 
            style={{ ...styles.boton, backgroundColor: colorFondo || colors.violeta }} 
            onClick={onClick}
        >
            Aceptar
        </button>
    );
};

const styles = {
    boton: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: colors.blanco,
        border: 'none',
        borderRadius: '5px',
        padding: '5px 35px',
        cursor: 'pointer',
        fontSize: '15px',
        transition: 'background-color 0.3s',
    },
};

export default BotonAceptar;
