import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Image, Button } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import handlePostRequest from '../services/api';
import * as FileSystem from 'expo-file-system';

export default function ImagePickerComponent() {
    const [pickedImagePath, setPickedImagePath] = useState('');

    const showImagePicker = async () => {
        
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
        if (permissionResult.granted === false) {
            alert("You've refused to allow this appp to access your photos!");
            return;
        }
    
        const result = await ImagePicker.launchImageLibraryAsync();
    
        if (!result.canceled) {
            try {
                // Convertir la URI a un camino de archivo
                const fileInfo = await FileSystem.getInfoAsync(result.uri);
                
                if (!fileInfo.exists) {
                    alert("El archivo no existe.");
                    return;
                }
    
                const imageInfo = fileInfo.uri; // La URI con el esquema 'file'
                
                const image = await FileSystem.readAsStringAsync(imageInfo, {
                    encoding: FileSystem.EncodingType.Base64,
                });

                console.log("imagepath64", image);

                const response = await handlePostRequest(image );

                console.log("response", response);

                if (response && response.image) {
                    setPickedImagePath(response.image);
                } else {
                    alert("Error al procesar la imagen.");
                }
            } catch (error) {
                console.error("Error al obtener información del archivo:", error);
            }
        }
    }
        return (
        <View style={styles.screen}>
            <View style={styles.buttonContainer}>
                <Button onPress={showImagePicker} title="Select an image" />
            </View>

            <View style={styles.imageContainer}>
                {
                    pickedImagePath !== '' && <Image
                        source={{ uri: pickedImagePath }}
                        style={styles.image}
                    />
                }
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonContainer: {
        width: 400,
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    imageContainer: {
        padding: 30,
    },
    image: {
        width: 329,  // Establece el ancho al 100%
        height: 411, // Establece la altura al 100%
    }
});


