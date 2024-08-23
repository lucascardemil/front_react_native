import { Alert } from 'react-native';
import { EXPO_Url } from '@env';


const AgregarAlumno = async (nombre, apellido, curso) => {
    if (nombre.trim() === '') {
        Alert.alert('Error', 'Ingrese el nombre antes de continuar.');
        return;
    }
    if (nombre.length > 16) {
        Alert.alert('Error', 'La alumno no puede tener más de 16 caracteres.');
        return;
    }
    if (apellido.trim() === '') {
        Alert.alert('Error', 'Ingrese el apellido antes de continuar.');
        return;
    }
    if (apellido.length > 16) {
        Alert.alert('Error', 'La alumno no puede tener más de 16 caracteres.');
        return;
    }

    try {

        const alumno = {
            nombre,
            apellido,
            curso_id: curso
        };

        const response = await fetch(`${EXPO_Url}/alumnos`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(alumno),
        });


        const data = await response.json();
        if(data.status){
            return data;
        }else{
            Alert.alert('Error', 'Error al crear el alumno');
        }

    } catch (error) {
        // Manejar errores de la solicitud
        console.error('Error al enviar la solicitud:', error.message);
        Alert.alert('Error', 'Hubo un problema al enviar la solicitud.');
    }
};


export default AgregarAlumno;