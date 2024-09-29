import React from "react";
import colors from "../constants/colors"; // Asegúrate de que este archivo existe y tiene la exportación de colores
import patronNumeros from '../assets/number_pattern.png'; // Importa la imagen correctamente

export default function Boton() {
    return(
        <div style={styles.contenedor}>
        </div>
    )
}

// Definición de estilos en línea
const styles = {
    contenedor: {
        backgroundColor: colors.violeta,
        textAlign: 'center',
        backgroundImage: `url(${patronNumeros})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',  
        backgroundRepeat: 'no-repeat', 
        width: '100vw', 
        height: '100vh', 
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },

};
