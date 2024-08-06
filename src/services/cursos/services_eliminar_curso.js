import { Alert } from 'react-native';
import { EXPO_Url } from '@env';

const eliminarCurso = async (id_curso) => {
    try {
        const response = await fetch(`${EXPO_Url}/cursos/${id_curso}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            return true
        } else {
            // Manejar errores de la respuesta DELETE
            console.error('Error en la respuesta DELETE:', response.statusText);
            Alert.alert('Error', 'Hubo un problema al eliminar el curso.');
        }
    } catch (error) {
        // Manejar errores de la solicitud DELETE
        console.error('Error al enviar la solicitud DELETE:', error.message);
        Alert.alert('Error', 'Hubo un problema al eliminar el curso.');
    }
};

export default eliminarCurso;