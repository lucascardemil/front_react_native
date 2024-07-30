import { Alert } from 'react-native';

const generarArrayPreguntas = (numeroPreguntas) => {
    return Array.from({ length: numeroPreguntas }, (_, index) => index);
};

const AgregarPrueba = async (usuario_id, preguntas, alternativas, respuestas, asignatura) => {
    // Validar que la asignatura no esté vacía
    if (asignatura.trim() === '') {
        Alert.alert('Error', 'Ingrese la asignatura antes de continuar.');
        return;
    }
    if (asignatura.length > 16) {
        x
        Alert.alert('Error', 'La asignatura no puede tener más de 16 caracteres.');
        return;
    }

    const preguntasArray = generarArrayPreguntas(preguntas);

    try {
        const datosHojadeRespuestas = {
            asignatura,
            preguntas: preguntasArray,
            respuestas,
            usuario_id,
            alternativas,
        };

        const response = await fetch('https://back-orm.onrender.com/hojarespuestas', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(datosHojadeRespuestas),
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

export default AgregarPrueba;