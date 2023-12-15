import React, { useState, useEffect } from 'react';
import { Alert, Text, View, StyleSheet, TouchableOpacity } from 'react-native';

export default MisHojas = () => {
  const [hojasRespuestas, setHojasRespuestas] = useState([]);

  const obtenerHojasRespuestas = async () => {
    try {
      const usuario_id = 1; // Reemplaza 1 con el ID del usuario real
      const response = await fetch(`https://4zrl78mg-5000.brs.devtunnels.ms/hojasrespuestasporusuario/${usuario_id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        const data = await response.json();
        console.log('info', data);
        setHojasRespuestas(data);
      } else {
        console.error('Error en la respuesta:', response.statusText);
        Alert.alert('Error', 'Hubo un problema al obtener las hojas de respuestas.');
      }
    } catch (error) {
      console.error('Error al obtener las hojas de respuestas:', error.message);
      Alert.alert('Error', 'Hubo un problema al obtener las hojas de respuestas.');
    }
  };
  
useEffect(() => {
  obtenerHojasRespuestas();
}, []);


  return (
    <View>
        {hojasRespuestas.map((hoja, index) => (
          <View key={index} style={styles.create}>
            <View style={styles.rowContainer}>
              <Text style={styles.text}>{hoja[1]}</Text>
            </View>
          </View>
        ))}
    </View>
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
});
