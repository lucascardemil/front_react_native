import { Alert } from 'react-native';
import { EXPO_Url } from '@env';


const obtenerAlumnosPorCurso = async (curso_id) => {
    try {
        const response = await fetch(`${EXPO_Url}/alumnos/curso/${curso_id}`);
        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            Alert.alert('Error', 'Hubo un problema al obtener los alumnos del curso.');
        }
    } catch (error) {
        console.error('Error al obtener los alumnos del curso:', error.message);
        Alert.alert('Error', 'Hubo un problema al obtener los alumnos del curso.');
    }
};

export default obtenerAlumnosPorCurso;