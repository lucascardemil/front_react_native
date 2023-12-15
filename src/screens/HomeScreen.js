import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Camera } from 'expo-camera';
import ImagePickerComponent from '../components/ImagePickerComponent'

export default function HomeScreen() {
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(status === 'granted');
    })();
  }, []);

  const handleScanButtonPress = () => {
    if (hasCameraPermission === null) {
      return <View />;
    }
    if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    }

    navigation.navigate('Scanner QR');
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <Button title="Scanear Prueba" onPress={handleScanButtonPress} />
      </View>
        <ImagePickerComponent />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    width: 150,
    marginTop: 60,
    marginBottom: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});
