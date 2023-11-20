import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Navbar = () => {
  return (
    <View style={styles.navbar}>
      <Text style={styles.text}>Inicio</Text>
      <Text style={styles.text}>Notas</Text>
      <Text style={styles.text}>Contacto</Text>
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
