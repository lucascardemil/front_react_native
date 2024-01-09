import React, { useState, useEffect } from 'react';
import { Alert, Text, View, StyleSheet, TouchableOpacity, Modal, Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; 
import CrearCurso from '../components/GenerarCurso'
export default MisCursos = ({ navigation }) => {
  const [cursos, setCursos] = useState([]);
  const [cursoAEliminar, setCursoAEliminar] = useState(null);
  const [confirmDeleteModalVisible, setConfirmDeleteModalVisible] = useState(false);

  useEffect(() => {
    const obtenerCursos = async () => {
      try {
        const user_id = 1; // Reemplaza 1 con el ID del usuario real
        const response = await fetch(`https://4zrl78mg-5000.brs.devtunnels.ms/cursosporusuario/${user_id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
  
        if (response.ok) {
          const data = await response.json();
          console.log('Data recibida del servidor:', data);
  
          // Verificar si 'cursos' está presente y es un array
          if (Array.isArray(data.cursos)) {
            setCursos(data.cursos);
          } else {
            console.error('La propiedad "cursos" no es un array en la respuesta del servidor.');
            Alert.alert('Error', 'Hubo un problema al obtener los cursos.');
          }
        } else {
          console.error('Error en la respuesta:', response.statusText);
          Alert.alert('Error', 'Hubo un problema al obtener los cursos.');
        }
      } catch (error) {
        console.error('Error al obtener los cursos:', error.message);
        Alert.alert('Error', 'Hubo un problema al obtener los cursos.');
      }
    };
  
    obtenerCursos();
  }, []);

  const eliminarCurso = async (id_curso) => {
    try {
      const response = await fetch(`https://4zrl78mg-5000.brs.devtunnels.ms/cursos/${id_curso}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        // Actualizar el estado después de la eliminación
        setCursos((prevCursos) => prevCursos.filter((curso) => curso[0] !== id_curso));
      } else {
        // Manejar errores de la respuesta DELETE
        console.error('Error en la respuesta DELETE:', response.statusText);
        Alert.alert('Error', 'Hubo un problema al eliminar el curso.');
      }
    } catch (error) {
      // Manejar errores de la solicitud DELETE
      console.error('Error al enviar la solicitud DELETE:', error.message);
      Alert.alert('Error', 'Hubo un problema al eliminar el curso.');
    }
  };

  const eliminarAlumnosYCurso = async (id_curso) => {
    try {
      // Realizar la solicitud DELETE para eliminar alumnos por curso
      const responseAlumnos = await fetch(`https://4zrl78mg-5000.brs.devtunnels.ms/eliminaralumnosporcurso/${id_curso}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (responseAlumnos.ok) {
        // Alumnos eliminados correctamente, ahora eliminar el curso
        await eliminarCurso(id_curso);
      } else {
        // Manejar errores de la respuesta DELETE para alumnos
        console.error('Error en la respuesta DELETE para alumnos:', responseAlumnos.statusText);
        Alert.alert('Error', 'Hubo un problema al eliminar los alumnos.');
      }
    } catch (error) {
      // Manejar errores de la solicitud DELETE para alumnos
      console.error('Error al enviar la solicitud DELETE para alumnos:', error.message);
      Alert.alert('Error', 'Hubo un problema al eliminar los alumnos.');
    }
  };
  
  const verDetalleCurso = (curso) => {
    navigation.navigate('Detalle Curso', { curso });
  };
      
const showConfirmDeleteModal = (curso) => {
    setCursoAEliminar(curso);
    setConfirmDeleteModalVisible(true);
  };

  const hideConfirmDeleteModal = () => {
    setCursoAEliminar(null);
    setConfirmDeleteModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <CrearCurso />
      {cursos ? (
        cursos.map((curso, index) => (
          <TouchableOpacity key={index} style={styles.create} onPress={() => verDetalleCurso(curso)}>
            <View style={styles.rowContainer}>
              <Text style={styles.text}>{curso[1]}</Text>
              <TouchableOpacity onPress={() => showConfirmDeleteModal(curso)}>
                <Icon name="trash-o" size={30} color="red" />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        ))
      ) : (
        <Text>No hay cursos disponibles.</Text>
      )}
      <Modal
        animationType="slide"
        transparent={true}
        visible={confirmDeleteModalVisible}
        onRequestClose={hideConfirmDeleteModal}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            {cursoAEliminar && (
              <Text style={styles.modalText}>
                ¿Seguro que desea borrar el curso "{cursoAEliminar[1]}"?
              </Text>
            )}
            <View style={{ flexDirection: 'row', justifyContent: 'space-around', width: '100%' }}>
              <Pressable
                style={[styles.button, styles.buttonbg]}
                onPress={hideConfirmDeleteModal}>
                <Text style={styles.textStyle}>Cancelar</Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.buttonbg]}
                onPress={() => {
                  hideConfirmDeleteModal();
                  eliminarAlumnosYCurso(cursoAEliminar[0]);
                }}>
                <Text style={styles.textStyle}>Borrar</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>      
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
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    width: 400,
    backgroundColor: 'white',
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#1e90ff', // Add black border
    padding: 35,
    alignItems: 'center',
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
  buttonbg: {
    backgroundColor: '#1e90ff',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 10,
    textAlign: 'center',
  },
});

