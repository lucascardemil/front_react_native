import { Alert } from 'react-native';
import { EXPO_Url } from '@env';

const editarAlumno = async (alumnoId, nuevoNombre, nuevoApellido) => {
    try {

        const response = await fetch(`${EXPO_Url}/alumnos/${alumnoId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                nombre: nuevoNombre,
                apellido: nuevoApellido,
            }),
        });

        if (response.ok) {
            return alumnoId;
        } else {
            Alert.alert('Error', 'Hubo un problema al editar el alumno.');
        }
    } catch (error) {
        console.error('Error al editar el alumno:', error.message);
        Alert.alert('Error', 'Hubo un problema al editar el alumno.');
    }
};

export default editarAlumno;