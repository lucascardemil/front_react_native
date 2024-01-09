const apiUrl = 'https://4zrl78mg-5000.brs.devtunnels.ms/api/scanner';

const handlePostRequest = async ({ image, ANSWER_KEY, jsonData, id }) => {

    const requestBody = {
        image,
        ANSWER_KEY, 
        jsonData,
        id_hoja_de_respuestas: id       
    };
    console.log("api", requestBody);

    try {        
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
        return data;
    } catch (error) {
        console.error('Error al realizar la solicitud POST:', error);
        return null;
    }
};

export default handlePostRequest;


