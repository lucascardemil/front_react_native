import { Alert } from 'react-native';

const editarAlumno = async (alumnoId, nuevoNombre, nuevoApellido) => {
    try {

        const response = await fetch(`https://back-orm.onrender.com/alumnos/${alumnoId}`, {
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