
import { Alert } from 'react-native';
import { EXPO_Url } from '@env';

const obtenerHojasRespuestas = async (user_id) => {
    try {
        const usuario_id = 1; // Reemplaza 1 con el ID del usuario real
        const response = await fetch(`${EXPO_Url}/hojasrespuestasporusuario/${usuario_id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const data = await response.json();

        if (data.status) {
            return data.hojas_respuestas;
        } else {
            Alert.alert('Error', data.error || 'Hubo un problema al obtener los hojas de respuestas.');
            return null;
        }
    } catch (error) {
        console.error('Error al obtener las hojas de respuestas:', error.message);
        Alert.alert('Error', 'Hubo un problema al obtener las hojas de respuestas.');
    }
};

export default obtenerHojasRespuestas;