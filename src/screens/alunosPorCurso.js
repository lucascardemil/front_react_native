import React, { useState, useEffect } from 'react';
import { Alert, Text, View, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { Table, Row, Rows } from 'react-native-table-component';
import Icon from 'react-native-vector-icons/FontAwesome';
import ModalAlumnos from '../components/ModalAlumnos'

const DetalleCurso = ({ route }) => {
  const { curso } = route.params;
  const [alumnos, setAlumnos] = useState([]);
  const [editingAlumnoId, setEditingAlumnoId] = useState(null);
  const [editedAlumnoValues, setEditedAlumnoValues] = useState({});
  const [showModal, setShowModal] = useState(false);

  const onPress = () => {
    console.log(curso);
    setShowModal(true);
  };

  const obtenerAlumnosPorCurso = async () => {
    try {
      const response = await fetch(`https://4zrl78mg-5000.brs.devtunnels.ms/alumnos/curso/${curso[0]}`);
      if (response.ok) {
        const data = await response.json();
        setAlumnos(data);
        console.log('Alumnos actualizados:', data);
      } else {
        Alert.alert('Error', 'Hubo un problema al obtener los alumnos del curso.');
      }
    } catch (error) {
      console.error('Error al obtener los alumnos del curso:', error.message);
      Alert.alert('Error', 'Hubo un problema al obtener los alumnos del curso.');
    }
  };
  

  const handleEditChange = (field, value) => {
    // Actualizar los valores editados
    setEditedAlumnoValues((prevValues) => ({
      ...prevValues,
      [field]: value !== undefined && value.trim() !== '' ? value.trim() : prevValues[field], // Usa el valor original si el nuevo es vacío o undefined
    }));
  };

  const eliminarAlumno = async (alumnoId) => {
    try {
      const response = await fetch(`https://4zrl78mg-5000.brs.devtunnels.ms/alumnos/${alumnoId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        const nuevosAlumnos = alumnos.filter((alumno) => alumno[0] !== alumnoId);
        setAlumnos(nuevosAlumnos);
      } else {
        Alert.alert('Error', 'Hubo un problema al eliminar el alumno.');
      }
    } catch (error) {
      console.error('Error al eliminar el alumno:', error.message);
      Alert.alert('Error', 'Hubo un problema al eliminar el alumno.');
    }
  };

  const editarAlumno = async (alumnoId) => {
    try {
      // Se obtienen los valores actualizados de editedAlumnoValues o se usan los originales
      const nuevoNombre = editedAlumnoValues.nombre !== undefined ? editedAlumnoValues.nombre.trim() : alumnos.find(a => a[0] === alumnoId)[1];
      const nuevoApellido = editedAlumnoValues.apellido !== undefined ? editedAlumnoValues.apellido.trim() : alumnos.find(a => a[0] === alumnoId)[2];
  
      const response = await fetch(`https://4zrl78mg-5000.brs.devtunnels.ms/alumnos/${alumnoId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nombre: nuevoNombre,
          apellido: nuevoApellido,
        }),
      });
  
      if (response.ok) {
        // Actualizar la lista de alumnos con el alumno editado
        const nuevosAlumnos = alumnos.map((alumno) => {
          if (alumno[0] === alumnoId) {
            return [alumno[0], nuevoNombre, nuevoApellido];
          }
          return alumno;
        });
  
        setAlumnos(nuevosAlumnos);
        // Finalizar el modo de edición
        setEditingAlumnoId(null);
        setEditedAlumnoValues({});
      } else {
        Alert.alert('Error', 'Hubo un problema al editar el alumno.');
      }
    } catch (error) {
      console.error('Error al editar el alumno:', error.message);
      Alert.alert('Error', 'Hubo un problema al editar el alumno.');
    }
  };

  useEffect(() => {
    obtenerAlumnosPorCurso();
  }, [curso]);

  const tableHead = ['Nombre', 'Apellido', 'Acciones'];
  const tableData = alumnos.map((alumno) => {
    const isEditing = editingAlumnoId === alumno[0];

    return [
      isEditing ? (
        <TextInput
          key={`nombre-${alumno[0]}`}
          placeholder="Nombre"
          value={editedAlumnoValues.nombre || alumno[1]}
          onChangeText={(value) => handleEditChange('nombre', value)}
        />
      ) : (
        <Text key={`nombre-${alumno[0]}`}>{alumno[1]}</Text>
      ),
      isEditing ? (
        <TextInput
          key={`apellido-${alumno[0]}`}
          placeholder="Apellido"
          value={editedAlumnoValues.apellido || alumno[2]}
          onChangeText={(value) => handleEditChange('apellido', value)}
        />
      ) : (
        <Text key={`apellido-${alumno[0]}`}>{alumno[2]}</Text>
      ),
      isEditing ? (
        <TouchableOpacity key={`acciones-${alumno[0]}`} onPress={() => editarAlumno(alumno[0])}>
          <Text>Guardar Cambios</Text>
        </TouchableOpacity>
      ) : (
        <View style={styles.icons} key={`acciones-${alumno[0]}`}>
          <TouchableOpacity onPress={() => setEditingAlumnoId(alumno[0])}>
            <Icon name="pencil" size={20} color="black" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => eliminarAlumno(alumno[0])}>
            <Icon name="trash-o" size={20} color="red" />
          </TouchableOpacity>
        </View>
      ),
    ];
  });

  return (
    <View>
      <Text style={styles.text}>{curso[1]}</Text>
      <View style={styles.container}>
        <TouchableOpacity onPress={onPress}>
            <Text style={styles.text2}>+</Text>
        </TouchableOpacity>
        <ModalAlumnos
          curso={curso}
          visible={showModal}
          onClose={() => setShowModal(false)}/>
      </View>
      <Table borderStyle={{ borderWidth: 2, borderColor: '#c8e1ff' }}>
        <Row data={tableHead} style={styles.head} textStyle={styles.tableHeaderText} />
        <Rows data={tableData} textStyle={styles.tableText} />
      </Table>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    margin: 20,
    fontSize: 55,
    marginBottom: 40
  },
  container: {
    width: '100%',
    height: 45,
    backgroundColor: '#1e90ff',
    alignItems: 'flex-end'
  },
  text2: {
    fontSize: 35,
    color: 'white',
    marginRight:12
  },
  icons: {
    flexDirection: 'row',
    gap: 24,
    justifyContent: 'flex-end',
    marginRight: 16
  },
  head: { 
    height: 40, 
    backgroundColor: '#f1f8ff' 
  },
  row: { 
    height: 40, 
    backgroundColor: 'white' 
  },
  tableHeaderText: {
    fontSize: 18,  
    fontWeight: 'bold',
  },
  tableText: {
    fontSize: 16,  
  },

});
export default DetalleCurso;
