import { Alert } from 'react-native';
import eliminarCurso from '../cursos/services_eliminar_curso';
import { EXPO_Url } from '@env';

const eliminarAlumnosYCurso = async (id_curso) => {
    try {
        // Realizar la solicitud DELETE para eliminar alumnos por curso
        const responseAlumnos = await fetch(`${EXPO_Url}/eliminaralumnosporcurso/${id_curso}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (responseAlumnos.ok) {
            // Alumnos eliminados correctamente, ahora eliminar el curso
            const eliminar_curso = await eliminarCurso(id_curso);
            if(eliminar_curso){
                return true;
            }
        } else {
            // Manejar errores de la respuesta DELETE para alumnos
            console.error('Error en la respuesta DELETE para alumnos:', responseAlumnos.statusText);
            Alert.alert('Error', 'Hubo un problema al eliminar los alumnos.');
        }
    } catch (error) {
        // Manejar errores de la solicitud DELETE para alumnos
        console.error('Error al enviar la solicitud DELETE para alumnos:', error.message);
        Alert.alert('Error', 'Hubo un problema al eliminar los alumnos.');
    }
};

export default eliminarAlumnosYCurso;