import { Alert } from 'react-native';

const eliminarAlumno = async (alumnoId) => {
    try {
        const response = await fetch(`https://back-orm.onrender.com/alumnos/${alumnoId}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            return alumnoId;
        } else {
            Alert.alert('Error', 'Hubo un problema al eliminar el alumno.');
        }
    } catch (error) {
        console.error('Error al eliminar el alumno:', error.message);
        Alert.alert('Error', 'Hubo un problema al eliminar el alumno.');
    }
};

export default eliminarAlumno;