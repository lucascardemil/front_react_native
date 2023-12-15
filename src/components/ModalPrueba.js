import React, { useState } from 'react';
import { Alert, Modal, StyleSheet, Text, Pressable, View, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const ModalPruebas = ({ visible, onClose, preguntas, alternativas, respuestas }) => {
  const [asignatura, setAsignatura] = useState('');
  const navigation = useNavigation();

  const handleNavigatePrueba = async () => {
    // Validar que la asignatura no esté vacía
    if (asignatura.trim() === '') {
      Alert.alert('Error', 'Ingrese la asignatura antes de continuar.');
      return;
    }

    // Resto del código para la solicitud
    const usuario_id = 1; // Agregué la declaración de usuario_id
    try {
      const datosHojadeRespuestas = {
        asignatura,
        preguntas,
        alternativas,
        respuestas,
        usuario_id,
      };

      console.log('datos', datosHojadeRespuestas);
      // Realizar la solicitud fetch
      const response = await fetch('https://4zrl78mg-5000.brs.devtunnels.ms//hojarespuestas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(datosHojadeRespuestas),
      });

      // Manejar la respuesta
      if (response.ok) {
        const responseData = await response.json();
        console.log(responseData);

        // Navegar y cerrar el modal
        navigation.navigate('Mis Pruebas');
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
            <Text style={styles.modalText}>Asignatura:</Text>
            <TextInput
              style={styles.input}
              placeholder="Ingrese la Asignatura"
              value={asignatura}
              onChangeText={(text) => setAsignatura(text)}
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

export default ModalPruebas;