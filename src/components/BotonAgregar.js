import React from "react";
import colors from "../constants/colors";
import iconoAgregar from '../assets/icon-agregar.png'; 


const BotonAgregar = ({ onClick }) => {
    return (
        <button style={styles.boton} onClick={onClick}>
            <img style={styles.icono} src={iconoAgregar} alt="Ícono de curso" /> 
            Agregar
        </button>
    );
};

const styles = {
    icono:{
        height: '30px',
        marginRight: '10px',
    },
    boton: {
        display:'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.violeta,
        color: colors.blanco, // Color del texto en blanco
        border: 'none',
        borderRadius: '5px',
        padding: '5px 35px',
        cursor: 'pointer',
        fontSize: '15px',
        transition: 'background-color 0.3s',
    },
};

export default BotonAgregar;
