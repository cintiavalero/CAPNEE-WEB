import React from "react";
import colors from "../constants/colors";
import patronNumeros from '../assets/number_pattern.png'; 

export default function FondoB({ children }) {  
    return(
        <div style={styles.contenedor}>
            {children}
        </div>
    );
}

// Definición de estilos en línea
const styles = {
    contenedor: {
        backgroundColor: colors.celeste,
        textAlign: 'center',
        backgroundImage: `url(${patronNumeros})`,
        backgroundSize: 'cover', 
        backgroundPosition: 'center', 
        backgroundRepeat: 'no-repeat', 
        width: '100vw', 
        height: '100vh', 
        display: 'flex', 
        justifyContent: 'center', 
    },
};
