import { Alert, Text, View, StyleSheet, TouchableOpacity, Modal, Pressable } from 'react-native';
import { EXPO_Url } from '@env';

const obtenerCursosPorUser = async (user_id) => {
    try {
        const response = await fetch(`${EXPO_Url}/cursosporusuario/${user_id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            const data = await response.json();

            if (Array.isArray(data.cursos)) {
                return data.cursos
            } else {
                Alert.alert('Error', 'Hubo un problema al obtener los cursos.');
            }
        } else {
            Alert.alert('Error', 'Hubo un problema al obtener los cursos.');
        }
    } catch (error){
        Alert.alert('Error', 'Hubo un problema al obtener los cursos.');
    }
}

export default obtenerCursosPorUser;