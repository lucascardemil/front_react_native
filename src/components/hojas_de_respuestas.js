import React, { useState, useEffect } from 'react';
import { Alert, Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; 

export default MisHojas = ({ navigation }) => {
  const [hojasRespuestas, setHojasRespuestas] = useState([]);

  useEffect(() => {
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
    obtenerHojasRespuestas();
  }, []);

  const eliminarHoja = async (hojaId) => {
    console.log(hojaId);
    try {
      // Realizar la solicitud DELETE
      const response = await fetch(`https://4zrl78mg-5000.brs.devtunnels.ms/hojarespuestas/${hojaId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        // Actualizar el estado después de la eliminación
        setHojasRespuestas((prevHojasRespuestas) =>
          prevHojasRespuestas.filter((hoja) => hoja[0] !== hojaId)
        );
      } else {
        // Manejar errores de la respuesta DELETE
        console.error('Error en la respuesta DELETE:', response.statusText);
        Alert.alert('Error', 'Hubo un problema al eliminar la hoja de respuestas.');
      }
    } catch (error) {
      // Manejar errores de la solicitud DELETE
      console.error('Error al enviar la solicitud DELETE:', error.message);
      Alert.alert('Error', 'Hubo un problema al eliminar la hoja de respuestas.');
    }
  };

  const onPresScaner = () => {
    navigation.navigate('Scanner');
  };
  
  return (
    <View>
      {hojasRespuestas ? (
        hojasRespuestas.map((hoja, index) => (
          <View key={index} style={styles.create}>
            <View style={styles.rowContainer}>
              <Text style={styles.text}>{hoja[1]}</Text>
              <TouchableOpacity  onPress={() => eliminarHoja(hoja[0])}>
                <Icon name="trash-o" size={30} color="red" />
              </TouchableOpacity>
            </View>
          </View>
        ))
      ) : (
        <Text>No hay hojas de respuestas disponibles.</Text>
      )}
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
    margin: 6,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 4,
  },
});
