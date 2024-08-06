import { Alert } from 'react-native';
import { EXPO_Url } from '@env';


const AgregarAlumno = async (nombre, apellido, curso) => {
    if (nombre.trim() === '') {
        Alert.alert('Error', 'Ingrese la asignatura antes de continuar.');
        return;
    }
    if (nombre.length > 16) {
        Alert.alert('Error', 'La asignatura no puede tener más de 16 caracteres.');
        return;
    }
    if (apellido.trim() === '') {
        Alert.alert('Error', 'Ingrese la asignatura antes de continuar.');
        return;
    }
    if (apellido.length > 16) {
        Alert.alert('Error', 'La asignatura no puede tener más de 16 caracteres.');
        return;
    }

    try {

        let QR = ''

        const alumno = {
            nombre,
            apellido,
            id_curso: curso,
            QR
        };

        const response = await fetch(`${EXPO_Url}/alumnos`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(alumno),
        });

        // Manejar la respuesta
        if (response.ok) {
            const data = await response.json();
            return data;

        } else {
            // Manejar errores de la respuesta
            console.error('Error en la respuesta:', response.statusText);
            Alert.alert('Error', 'Hubo un problema al enviar la solicitud.');
        }
    } catch (error) {
        // Manejar errores de la solicitud
        console.error('Error al enviar la solicitud:', error.message);
        Alert.alert('Error', 'Hubo un problema al enviar la solicitud.');
    }
};


export default AgregarAlumno;