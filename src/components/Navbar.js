import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Navbar = () => {
  const navigation = useNavigation();

  const onPressMisPruebas = () => {
    navigation.navigate('Mis Pruebas');
  };

  const onPressInicio = () => {
    navigation.navigate('Inicio');
  };

  return (
    <View style={styles.navbar}>
      <Text onPress={onPressInicio} style={styles.text}>Inicio</Text>
      <Text style={styles.text}>Notas</Text>
      <Text onPress={onPressMisPruebas} style={styles.text}>Mis Pruebas</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  navbar: {
    height: 100,
    paddingTop: 38,
    backgroundColor: '#1e90ff',
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  text: {
    display: 'flex',
    justifyContent: 'center',
    color: '#fff',
    fontSize: 18,
    margin: 10,
  },
});

export default Navbar;
