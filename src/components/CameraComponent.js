import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import handlePostRequest from '../services/scanner/services_seleccionar_archivo';

export default function CameraComponent({ id, alternativas, preguntas, respuestas, data_alumno, ANSWER_KEY}) {
    const navigation = useNavigation();

    const handleTomarFoto = async () => {

        // Solicitar permisos para usar la cámara
        const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

        if (permissionResult.granted === false) {
            alert("You've refused to allow this app to access your camera!");
            return;
        }

        // Lanzar la cámara
        const result = await ImagePicker.launchCameraAsync();

        if (result.canceled) {
            navigation.navigate('Gestion de prueba', { id: id, alternativas: alternativas, preguntas: preguntas, respuestas: respuestas, data_alumno: data_alumno, ANSWER_KEY: ANSWER_KEY, imagen: '' });
            return;
        }

        try {
            // Obtener información del archivo
            const fileInfo = await FileSystem.getInfoAsync(result.assets[0].uri);

            if (!fileInfo.exists) {
                alert("El archivo no existe.");
                return;
            }

            // Leer el archivo como una cadena base64
            const image = await FileSystem.readAsStringAsync(fileInfo.uri, {
                encoding: FileSystem.EncodingType.Base64,
            });

            // Enviar la imagen codificada en base64 a la función de manejo de la solicitud
            const response = await handlePostRequest({ image, alternativas, ANSWER_KEY, data_alumno, id });

            if (response && response.image) {
                // Establecer la ruta de la imagen seleccionada
                navigation.navigate('Gestion de prueba', { id: id, alternativas: alternativas, preguntas: preguntas, respuestas: respuestas, data_alumno: data_alumno, ANSWER_KEY: ANSWER_KEY, imagen: response.image });
            } else {
                alert("Error al procesar la imagen.");
            }
        } catch (error) {
            console.error("Error al obtener información del archivo:", error);
            alert("Ha ocurrido un error al procesar la imagen.");
        }
    }

    return (
        <View>
            <TouchableOpacity style={styles.button} onPress={handleTomarFoto}>
                <Ionicons name="scan" size={24} color="#FFFFFF" />
                <Text style={styles.textButton}>Escanear Prueba</Text>
            </TouchableOpacity>
        </View>

    );
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#007BFF',
        padding: 10,
        borderRadius: 5,
        flexDirection: 'row',
        alignItems: 'center',
    },
    textButton: {
        color: 'white',
        marginLeft: 10,
    }
});

