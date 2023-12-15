import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import GenerarFormulario from '../components/GenerarFormulario';
import { Picker } from '@react-native-picker/picker';

const GeneratePrueba = () => {
  const [cantidadPreguntas, setCantidadPreguntas] = useState(10);
  const [cantidadAlternativas, setCantidadAlternativas] = useState(3);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  const handleGenerarFormulario = () => {
    setMostrarFormulario(true);
  };

  const maxPreguntas = 70;

  return (
    <View style={styles.container}>
      <Text>Seleccione la cantidad de preguntas:</Text>
        <View style={styles.piker}>
          <Picker
            selectedValue={cantidadPreguntas}
            onValueChange={(itemValue) => setCantidadPreguntas(itemValue)}
            >
            {[...Array(maxPreguntas - 9).keys()].map((value) => (
              <Picker.Item key={value} label={`${value + 10}`} value={value + 10} />
            ))}
          </Picker>
        </View>
      <Text>Seleccione la cantidad de alternativas:</Text>
        <View style={styles.piker}>
          <Picker
            
            selectedValue={cantidadAlternativas}
            onValueChange={(itemValue) => setCantidadAlternativas(itemValue)}
            >
            {[...Array(3).keys()].map((value) => (
              <Picker.Item key={value} label={`${value + 3}`} value={value + 3} />
              ))}
          </Picker>
        </View>
        <Button title="Generar Formulario" onPress={handleGenerarFormulario} />
          {mostrarFormulario && (
            <GenerarFormulario
            style={styles.generador}
            preguntas={cantidadPreguntas}
            alternativas={cantidadAlternativas}
            />
            )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
  },
  generador: {
    marginTop: 600
  },
  piker: {
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#1e90ff',
    marginBottom: 20
  }
});

export default GeneratePrueba;
