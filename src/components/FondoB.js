import React from "react";
import colors from "../constants/colors";
import patronNumeros from '../assets/number_pattern.png'; 

export default function FondoA({ children }) {  
    return(
        <div style={stylesFondoA.contenedor}>
            {children}
        </div>
    )
}

// Definición de estilos en línea
const stylesFondoA = {
    contenedor: {
        backgroundColor: colors.celesteClaro,
        textAlign: 'center',
        backgroundImage: `url(${patronNumeros})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',  
        backgroundRepeat: 'no-repeat', 
        width: '100vw', 
        height: '100vh', 
        display: 'flex',
        flexDirection: 'column',
    },

};
