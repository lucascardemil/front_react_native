import React from 'react';
import { View, StyleSheet, Image, Text, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import handlePostRequest from '../services/scanner/services_seleccionar_archivo';

export default function ImagePickerComponent({ alumno, asignatura, ANSWER_KEY }) {
    const navigation = useNavigation();

    const showImagePicker = async () => {
        // Solicitar permisos para usar la biblioteca de medios
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
        if (permissionResult.granted === false) {
            alert("You've refused to allow this app to access your photos!");
            return;
        }
    
        // Lanzar la biblioteca de imágenes
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: false,
            quality: 1, // calidad máxima
        });
    
        if (result.canceled) {
            navigation.navigate('Gestion de prueba', { alumno, asignatura, imagen: '' });
            return;
        }
    
        try {
            // Obtener información del archivo
            const fileInfo = await FileSystem.getInfoAsync(result.assets[0].uri);
    
            if (!fileInfo.exists) {
                alert("El archivo no existe.");
                return;
            }
    
            // Enviar la imagen como archivo binario
            const response = await handlePostRequest({
                id: asignatura.id,
                alumno,
                alternativas: asignatura.alternativas,
                ANSWER_KEY,
                imageUri: fileInfo.uri,
                total_columnas: asignatura.total_columnas,
            });
    
            if (response && response.image) {
                // Establecer la ruta de la imagen seleccionada
                navigation.navigate('Gestion de prueba', { alumno, asignatura, imagen: response.image });
            } else {
                alert("Error al procesar la imagen.");
            }
        } catch (error) {
            console.error("Error al obtener información del archivo:", error);
            alert("Ha ocurrido un error al procesar la imagen.");
        }
    };

    return (
        <View style={{ marginTop: 20 }}>
            <TouchableOpacity style={styles.button} onPress={showImagePicker}>
                <AntDesign name="filetext1" size={24} color="white" />
                <Text style={styles.textButton}>Seleccione un archivo</Text>
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
