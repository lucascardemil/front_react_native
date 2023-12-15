import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView} from 'react-native';
import MisHojas from '../components/hojas_de_respuestas'
export default MisPruebas = ({ navigation }) => {

  const onPressPrueba = () => {
    navigation.navigate('Prueba');
  };

  return (
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
      <TouchableOpacity onPress={onPressPrueba}>
        <View style={styles.create}>
          <Text style={styles.text}>
            Crear Nueva Prueba +
          </Text>
        </View>
      </TouchableOpacity>
      <MisHojas/>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  create: {
    width: 310,
    height: 85,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: '#1e90ff',
    marginBottom: 20,
    textAlign: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 30,
    margin: 6
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 4
  },
  scrollViewContainer: {
    padding: 20,
  },
});
