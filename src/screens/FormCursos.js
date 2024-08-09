import React, { useState } from 'react';
import { Alert, Text, View, Button, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import styles from '../styles/style_form_cursos';
import guardarCurso from '../services/cursos/services_form_cursos';
import obtenerCursosPorIdCurso from '../services/cursos/services_curso_id';

const CrearCursoFormulario = ({ navigation }) => {
    const [curso, setCurso] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        const response_guardar_curso = await guardarCurso(curso);
        if (response_guardar_curso.status === true) {
            const response_obtener_curso_id = await obtenerCursosPorIdCurso(response_guardar_curso.curso_id);
            if (response_obtener_curso_id.status === true) {
                Alert.alert('Success', response_guardar_curso.mensaje);
                navigation.navigate('Mis Cursos', { nuevoCurso: response_obtener_curso_id.curso });
            }
        }
    }

    return (
        <View style={styles.centeredView}>
            <TextInput
                style={styles.input}
                value={curso}
                onChangeText={(text) => setCurso(text)}
                placeholder="Ingrese el nombre del curso"
            />
            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                <AntDesign name="plussquareo" size={24} color="white" />
                <Text style={styles.buttonText}>Crear Curso</Text>
            </TouchableOpacity>
        </View>
    );
};

export default CrearCursoFormulario;
