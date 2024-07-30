
const guardarCurso = async (curso) => {
    const nuevoCurso = {
        curso,
        activo: true,
        user_id: 1,
    };

    try {
        const response = await fetch('https://back-orm.onrender.com/cursos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(nuevoCurso),
        });

        const data = await response.json();
        return response.ok ? data : data;
    } catch (error) {
        return error;
    }
}

export default guardarCurso;