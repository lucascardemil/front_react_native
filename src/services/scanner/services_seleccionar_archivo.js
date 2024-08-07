import { Alert } from 'react-native';
import { EXPO_Url } from '@env';

const handlePostRequest = async ({ image, alternativas, ANSWER_KEY, data_alumno, id }) => {

    const requestBody = {
        image,
        alternativas,
        ANSWER_KEY,
        data_alumno,
        id
    };

    try {
        const response = await fetch(`${EXPO_Url}/scanner`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody),
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


