import { Alert } from 'react-native';
import { EXPO_Url } from '@env';

const handlePostRequest = async ({ id, alumno, alternativas, ANSWER_KEY, imageUri, total_columnas }) => {
    const formData = new FormData();

    formData.append('image', {
        uri: imageUri,
        name: 'image.png', // Puedes cambiar el nombre y extensión según sea necesario
        type: 'image/png' // Asegúrate de que el tipo MIME coincida con el formato de la imagen
    });


    formData.append('total_columnas', total_columnas);
    formData.append('alternativas', alternativas);
    formData.append('ANSWER_KEY', JSON.stringify(ANSWER_KEY));
    formData.append('alumno', JSON.stringify(alumno));
    formData.append('id', id);

    try {
        const response = await fetch(`${EXPO_Url}/scanner`, {
            method: 'POST',
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            body: formData,
        });

        const data = await response.json();

        if (data.status) {
            return data;
        } else {
            Alert.alert('Error', data.error || 'Hubo un problema al obtener los hojas de respuestas.');
            return null;
        }
    } catch (error) {
        console.error('Error al realizar la solicitud POST:', error);
        return null;
    }
};

export default handlePostRequest;


