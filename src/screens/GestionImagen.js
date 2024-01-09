import React from 'react';
import { View, Text, Button, StyleSheet} from 'react-native';
import ImagePickerComponent from '../components/ImagePickerComponent'

const GestionImagen = ({ navigation, route }) => {
  const { id , preguntas: columnas, respuestas: respuestasCorrectas, jsonData } = route.params;
  console.log(jsonData, "gestion");

  const preguntas = JSON.parse(columnas)
  const respuestas = JSON.parse(respuestasCorrectas)

  const ANSWER_KEY = {};
  preguntas.forEach((pregunta, index) => {
    ANSWER_KEY[pregunta.toString()] = respuestas[index].toString();
  });

  console.log(ANSWER_KEY);  
  const handleTomarFoto = () => {
    navigation.navigate('Scanner', { jsonData, ANSWER_KEY, id });
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <Button title="Scanear Prueba" onPress={handleTomarFoto}/>
      </View>
        <ImagePickerComponent jsonData={jsonData} ANSWER_KEY={ANSWER_KEY} id={id}/>
    </View>

  );
};

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

export default GestionImagen;
