import React, { useState } from 'react';
import { Alert, Modal, StyleSheet, Text, Pressable, View, TextInput } from 'react-native';

const ModalAlumnos = ({ visible, onClose, curso, }) => {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');

  const handleNavigatePrueba = async () => {
    if (nombre.trim() === '') {
      Alert.alert('Error', 'Ingrese la asignatura antes de continuar.');
      return;
    }
    if (nombre.length > 16) {
      Alert.alert('Error', 'La asignatura no puede tener más de 16 caracteres.');
      return;
    }
    if (apellido.trim() === '') {
      Alert.alert('Error', 'Ingrese la asignatura antes de continuar.');
      return;
    }
    if (apellido.length > 16) {
      Alert.alert('Error', 'La asignatura no puede tener más de 16 caracteres.');
      return;
    }
    
    try {

      QR = ''
      
      const alumno = {
        nombre,
        apellido,
        id_curso: curso[0],
        QR
      };

      console.log('datos', alumno);
      // Realizar la solicitud fetch
      const response = await fetch('https://4zrl78mg-5000.brs.devtunnels.ms/alumnos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(alumno),
      });

      // Manejar la respuesta
      if (response.ok) {
        const responseData = await response.json();
        console.log(responseData);

        onClose();

      } else {
        // Manejar errores de la respuesta
        console.error('Error en la respuesta:', response.statusText);
        Alert.alert('Error', 'Hubo un problema al enviar la solicitud.');
      }
    } catch (error) {
      // Manejar errores de la solicitud
      console.error('Error al enviar la solicitud:', error.message);
      Alert.alert('Error', 'Hubo un problema al enviar la solicitud.');
    }
  };

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={visible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          onClose();
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Alumno:</Text>
            <TextInput
              style={styles.input}
              placeholder="Ingrese el Nombre del alumno"
              value={nombre}
              onChangeText={(text) => setNombre(text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Ingrese el Apellido del alumno"
              value={apellido}
              onChangeText={(text) => setApellido(text)}
            />
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={handleNavigatePrueba}>
              <Text style={styles.textStyle}>OK!</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'start',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    marginTop: 10,
    elevation: 2,
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 10,
    textAlign: 's',
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

export default ModalAlumnos;