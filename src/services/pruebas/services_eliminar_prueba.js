
import { Alert } from 'react-native';

const eliminarHojasRespuestas = async (hojaId) => {
    try {
        // Realizar la solicitud DELETE
        const response = await fetch(`https://back-orm.onrender.com/hojarespuestas/${hojaId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            // Actualizar el estado después de la eliminación
            return hojaId;
        } else {
            // Manejar errores de la respuesta DELETE
            console.error('Error en la respuesta DELETE:', response.statusText);
            Alert.alert('Error', 'Hubo un problema al eliminar la hoja de respuestas.');
        }
    } catch (error) {
        // Manejar errores de la solicitud DELETE
        console.error('Error al enviar la solicitud DELETE:', error.message);
        Alert.alert('Error', 'Hubo un problema al eliminar la hoja de respuestas.');
    }
};


export default eliminarHojasRespuestas;