import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Image, Button } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function CameraComponent() {
  const [pickedImagePath, setPickedImagePath] = useState('');

  const openCamera = async () => {
    // Ask the user for the permission to access the camera
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("You've refused to allow this appp to access your camera!");
      return;
    }

    const result = await ImagePicker.launchCameraAsync();

    if (!result.canceled) {
      setPickedImagePath(result.assets[0].uri);
      console.log(result.assets[0].uri);
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

