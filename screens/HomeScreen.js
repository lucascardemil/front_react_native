import React from 'react';
import { View, StyleSheet } from 'react-native';
import CameraComponent from '../components/CameraComponent';
import ImagePickerComponent from '../components/ImagePickerComponent';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <CameraComponent />
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
});
