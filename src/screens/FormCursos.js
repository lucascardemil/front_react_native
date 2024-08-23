import React, { useState } from 'react';
import { Alert, Text, View, TouchableOpacity, TextInput } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import styles from '../styles/style_form_cursos';
import guardarCurso from '../services/cursos/services_form_cursos';
import obtenerCursosPorIdCurso from '../services/cursos/services_curso_id';
import Cargando from '../components/Cargando';

const CrearCursoFormulario = ({ navigation }) => {
    const [curso, setCurso] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (curso.trim() === '') {
            setError('El nombre del curso es requerido');
            return;
        }

        setIsLoading(true); // Mostrar el indicador de carga
        setError(''); // Limpiar el mensaje de error

        const response_guardar_curso = await guardarCurso(curso);
        if (response_guardar_curso.status === true) {
            const response_obtener_curso_id = await obtenerCursosPorIdCurso(response_guardar_curso.curso_id);
            if (response_obtener_curso_id.status === true) {
                setTimeout(() => {
                    setIsLoading(false);
                    Alert.alert('Correcto', response_guardar_curso.mensaje);
                    navigation.navigate('Mis Cursos', { nuevoCurso: response_obtener_curso_id.curso });
                }, 2000);
            }
        }
    };

    return (
        <View style={styles.centeredView}>
            <TextInput
                style={styles.input}
                value={curso}
                onChangeText={(text) => setCurso(text)}
                placeholder="Ingrese el nombre del curso"
            />
            {error ? <Text style={styles.errorText}>{error}</Text> : null}
            <TouchableOpacity style={styles.button} onPress={handleSubmit} disabled={isLoading}>
                <AntDesign name="plussquareo" size={24} color="white" />
                <Text style={styles.buttonText}>Crear Curso</Text>
            </TouchableOpacity>
            {isLoading && (
                <Cargando/>
            )}
        </View>
    );
};

export default CrearCursoFormulario;
