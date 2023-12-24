import React, { useState, useEffect } from 'react';
import { Alert, Text, View, StyleSheet, Image } from 'react-native';
import axios from 'axios';

const DetalleCurso = ({ route }) => {
  const { idCurso } = route.params;
  const [alumnos, setAlumnos] = useState([]);

  useEffect(() => {
    const obtenerAlumnosPorCurso = async () => {
      try {
        const response = await axios.get(`https://4zrl78mg-5000.brs.devtunnels.ms/alumnos/curso/${idCurso}`);
        console.log(response);
        if (response.status === 200) {
          const imageUrl = `data:image/png;base64, ${response.data.qr}`;
          setAlumnos([{ qr: imageUrl }]);
        } else {
          console.error('Error en la respuesta:', response.statusText);
          Alert.alert('Error', 'Hubo un problema al obtener los alumnos del curso.');
        }
      } catch (error) {
        console.error('Error al obtener los alumnos del curso:', error.message);
        Alert.alert('Error', 'Hubo un problema al obtener los alumnos del curso.');
      }
    };

    obtenerAlumnosPorCurso();
  }, [idCurso]);

  return (
    <View>
      <Text>Alumnos del Curso</Text>
      {alumnos.length > 0 ? (
        <View>
          {alumnos.map((alumno, index) => (
            <View key={index}>
              <Image source={{ uri: alumno.qr }} style={styles.qrImage} />
            </View>
          ))}
        </View>
      ) : (
        <Text>No hay alumnos en este curso.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  qrImage: {
    width: 50,
    height: 50,
  },
});

export default DetalleCurso;
