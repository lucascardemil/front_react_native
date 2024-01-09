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
      <View style={styles.instructionsContainer}>
        <Text style={styles.title}>Cómo funciona:</Text>
        <Text style={styles.subtitle}>Pasos a seguir:</Text>
        <Text>1° Crea tu curso con tus alumnos</Text>
        <Text>2° Crea tu hoja de respuestas</Text>
        <Text>3° Escanea el QR del evaluado</Text>
        <Text>4° Selecciona las respuestas correctas</Text>
        <Text>5° Escanea la prueba del evaluado</Text>
        <Text>6° Obten tu nota y repite</Text>
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Scanear Prueba" onPress={handleScanButtonPress} />
      </View>
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
    marginTop: 80,
    marginBottom: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  instructionsContainer: {
    padding: 20,
    borderWidth: 2,
    borderColor: '#1e90ff',
    borderRadius: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
});
