import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Button, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ModalPruebas from '../components/ModalPrueba';  // Ajusta la ruta según la ubicación de tu ModalPruebas

const Alternativa = ({ letra, onPress, isSelected }) => (
  <TouchableOpacity onPress={onPress}>
    <View style={[styles.alternativa, isSelected && styles.selectedAlternativa]}>
      <Text>{letra}</Text>
    </View>
  </TouchableOpacity>
);

const GenerarFormulario = ({ preguntas, alternativas }) => {
  const [respuestas, setRespuestas] = useState(Array(preguntas).fill(0));
  const [showModal, setShowModal] = useState(false);

  const letrasAlternativas = ['a', 'b', 'c', 'd', 'e'];

  const handleRespuestaChange = (index, value) => {
    const nuevasRespuestas = [...respuestas];
    nuevasRespuestas[index] = value;
    setRespuestas(nuevasRespuestas);
  };

  const handleSubirPrueba = () => {
    const preguntasSinResponder = [];
    respuestas.forEach((respuesta, index) => {
      if (respuesta === 0) {
        preguntasSinResponder.push(index + 1);
      }
    });
  
    if (preguntasSinResponder.length === 0) {
      setShowModal(true);
    } else {
      const preguntasSinResponderString = preguntasSinResponder.join(', ');
      Alert.alert('Error', `Debes contestar la(s) pregunta(s) ${preguntasSinResponderString} antes de subir la prueba`);
    }
  };


  return (
    <ScrollView contentContainerStyle={styles.scrollViewContainer}>
      <View style={styles.container}>
        {[...Array(preguntas).keys()].map((index) => (
          <View key={index} style={styles.preguntaContainer}>
            <Text>Pregunta {index + 1}:</Text>
            <View style={styles.alternativasContainer}>
              {[...Array(alternativas).keys()].map((value) => (
                <Alternativa
                  key={value}
                  letra={letrasAlternativas[value]}
                  onPress={() => handleRespuestaChange(index, value + 1)}
                  isSelected={respuestas[index] === value + 1}
                />
              ))}
            </View>
          </View>
        ))}
        <Button title="Subir Prueba" onPress={handleSubirPrueba} />
        <ModalPruebas 
          visible={showModal}
          respuestas={respuestas}             
          preguntas={preguntas}
          alternativas={alternativas}
          onClose={() => setShowModal(false)}/>
      </View>
    </ScrollView>
  );
};


const styles = StyleSheet.create({
  scrollViewContainer: {
    padding: 20,
  },
  container: {
    display: 'flex',
    justifyContent: 'center',
  },
  preguntaContainer: {
    marginBottom: 20,
  },
  alternativasContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 8,
  },
  alternativa: {
    backgroundColor: '#1e90ff',
    padding: 10,
    textAlign: 'center',
    alignContent: 'center',
    alignItems: 'center',
    width: 40,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: 'blue',
    marginRight: 8,
  },
  selectedAlternativa: {
    backgroundColor: 'blue',
    borderColor: 'white',
  },
});

export default GenerarFormulario;
