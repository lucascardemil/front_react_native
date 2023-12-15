import React, { useState, useEffect} from 'react';
import { View, Text, StyleSheet, Image, Button } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import handlePostRequest from '../services/api';

export default function CameraComponent() {
  const [pickedImagePath, setPickedImagePath] = useState('');

  const openCamera = async () => {

    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("You've refused to allow this app to access your camera!");
      return;
    }

    const result = await ImagePicker.launchCameraAsync();
    console.log(result, 'result');

    if (!result.canceled) {
      try {
          // Convertir la URI a un camino de archivo
          const fileInfo = await FileSystem.getInfoAsync(result.assets[0].uri);
          
          if (!fileInfo.exists) {
              alert("El archivo no existe.");
              return;
          }

          const imageInfo = fileInfo.uri; // La URI con el esquema 'file'
          
          const image = await FileSystem.readAsStringAsync(imageInfo, {
              encoding: FileSystem.EncodingType.Base64,
          });
          console.log("imagepath64", imageInfo);
                
          const response = await handlePostRequest(image);

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

useEffect(() => {
  openCamera(); // Llamada a openCamera al cargar la vista
}, []);

  return (
    <View style={styles.screen}>
      <View style={styles.imageContainer}>
        {
          pickedImagePath !== '' && 
          <Image
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
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 0
  },
  imageContainer: {
    padding: 30
  },
  image: {
    width: 400,
    height: 300,
    resizeMode: 'cover'
  }
});

