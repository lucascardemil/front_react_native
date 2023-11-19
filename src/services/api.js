const apiUrl = 'http://127.0.0.1:5000/api/scanner';

const handlePostRequest = async (image) => {
    // Configura los datos a enviar en la solicitud POST (puedes ajustarlo según tus necesidades)
    const requestBody = {
        image: image,
    };

    try {
        // Realiza la solicitud POST utilizando fetch
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody),
        });

        // Verifica el estado de la respuesta
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        // Convierte la respuesta a formato JSON
        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.error('Error al realizar la solicitud POST:', error);
        return null;
    }
};

export default handlePostRequest;


