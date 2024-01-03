import React, { useState } from 'react';
import {Text, View, TextInput, Button, StyleSheet} from 'react-native';

const CrearCursoFormulario = ({navigation}) => {
  const [curso, setCurso] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    const nuevoCurso = {
      curso,
      activo: true,
      user_id: 1,
    };

    try {
      const response = await fetch('https://4zrl78mg-5000.brs.devtunnels.ms/cursos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(nuevoCurso),
      });

      if (response.ok) {
        console.log('Curso creado exitosamente');
        navigation.navigate('Mis Cursos');
        // Puedes realizar alguna acción adicional después de la creación exitosa
      } else {
        console.error('Error al crear el curso');
      }
    } catch (error) {
      console.error('Error de red:', error);
    }
  };

  return (
      <View style={styles.centeredView}>
          <TextInput
            style={styles.input} 
            value={curso} 
            onChangeText={(text) => setCurso(text)} 
            placeholder="Ingrese el nombre del curso"
          />
          <Button 
            style={styles.button}
            onPress={handleSubmit} 
            title="Crear Curso" 
          />
      </View>  
    );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  button: {
    width: 300,
    borderRadius: 100,
    padding: 10,
    marginTop: 10,
    elevation: 2,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
    width: 250,
  },
});

export default CrearCursoFormulario;
