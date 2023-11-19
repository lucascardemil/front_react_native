import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Image, Button } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import fetchData from '../services/api';

export default function CameraComponent() {
  const [pickedImagePath, setPickedImagePath] = useState('');
  const [data, setData] = useState(null);

  const fetchDataFromApi = async () => {
    try {
      const result = await fetchData(pickedImagePath);
      setData(result);
    } catch (error) {
      console.error('Error al obtener datos de la API:', error);
    }
  };

  const openCamera = async () => {
    // Ask the user for the permission to access the camera
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("You've refused to allow this app to access your camera!");
      return;
    }

    const result = await ImagePicker.launchCameraAsync();

    if (!result.canceled) {
      setPickedImagePath(result.assets[0].uri);
      fetchDataFromApi();
    }
  }

  return (
    <View style={styles.screen}>
      <View style={styles.buttonContainer}>
        <Button onPress={openCamera} title="Open camera" />
      </View>

      <View style={styles.imageContainer}>
        {
          pickedImagePath !== '' && <Image
            source={{ uri: pickedImagePath }}
            style={styles.image}
          />
        }
      </View>
      <View>
        <Text>Datos de la API:</Text>
        {data ? (
          <Text>{JSON.stringify(data)}</Text>
        ) : (
          <Text>Cargando datos...</Text>
        )}
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
    justifyContent: 'space-around'
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

