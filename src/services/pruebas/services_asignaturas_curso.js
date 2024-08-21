
import { Alert } from 'react-native';
import { EXPO_Url } from '@env';

const obtenerAsignaturasCurso = async (curso_id) => {
    try {
        const response = await fetch(`${EXPO_Url}/asignaturasporcurso/${curso_id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const data = await response.json();

        if (data.status) {
            return data.asignaturas;
        } else {
            Alert.alert('Error', data.error || 'Hubo un problema al obtener los hojas de respuestas.');
            return null;
        }
    } catch (error) {
        console.error('Error al obtener las hojas de respuestas:', error.message);
        Alert.alert('Error', 'Hubo un problema al obtener las hojas de respuestas.');
    }
};

export default obtenerAsignaturasCurso;