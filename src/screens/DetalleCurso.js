import React, { useState, useEffect } from 'react';
import { ScrollView, Text, View, TouchableOpacity, TextInput } from 'react-native';
import { Table, Row, Rows } from 'react-native-table-component';
import styles from '../styles/style_detalle_curso';
import { AntDesign, Feather } from '@expo/vector-icons';
import ModalAlumnos from '../components/ModalAlumnos';
import obtenerAlumnosPorCurso from '../services/alumnos/services_alumnos_curso';
import eliminarAlumno from '../services/alumnos/services_eliminar_alumno';
import editarAlumno from '../services/alumnos/services_editar_alumno';

const DetalleCurso = ({ route }) => {
    const { curso } = route.params;
    const [alumnos, setAlumnos] = useState([]);
    const [editingAlumnoId, setEditingAlumnoId] = useState(null);
    const [editedAlumnoValues, setEditedAlumnoValues] = useState({});
    const [showModal, setShowModal] = useState(false);

    const onPress = () => {
        setShowModal(true);
    };

    const handleEditChange = (field, value) => {
        // Actualizar los valores editados
        setEditedAlumnoValues((prevValues) => ({
            ...prevValues,
            [field]: value, // Permitir que el valor sea vacío
        }));
    };    

    useEffect(() => {
        const fetchCursos = async () => {
            const data_cursos = await obtenerAlumnosPorCurso(curso[0]);
            setAlumnos(data_cursos);
        };
        fetchCursos();
    }, [curso]);

    const handleAlumnoAdded = (nuevoAlumno) => {
        setAlumnos((prevAlumnos) => [...prevAlumnos, nuevoAlumno]);
    };

    const tableHead = ['Nombre', 'Apellido', 'Acciones'];
    const tableData = alumnos.map((alumno) => {
        const isEditing = editingAlumnoId === alumno[0];
        const nombre = isEditing ? editedAlumnoValues.nombre ?? alumno[1] : alumno[1];
        const apellido = isEditing ? editedAlumnoValues.apellido ?? alumno[2] : alumno[2];

        return [
            isEditing ? (
                <TextInput
                    key={`nombre-${alumno[0]}`}
                    placeholder="Nombre"
                    value={nombre}
                    onChangeText={(value) => handleEditChange('nombre', value)}
                    style={styles.tableText}
                />
            ) : (
                <Text key={`nombre-${alumno[0]}`} style={styles.tableText}>{nombre}</Text>
            ),
            isEditing ? (
                <TextInput
                    key={`apellido-${alumno[0]}`}
                    placeholder="Apellido"
                    value={apellido}
                    onChangeText={(value) => handleEditChange('apellido', value)}
                    style={styles.tableText}
                />
            ) : (
                <Text key={`apellido-${alumno[0]}`} style={styles.tableText}>{apellido}</Text>
            ),
            isEditing ? (
                <TouchableOpacity key={`acciones-${alumno[0]}`} onPress={async () => {
                    const nuevoNombre = editedAlumnoValues.nombre?.trim() ?? nombre;
                    const nuevoApellido = editedAlumnoValues.apellido?.trim() ?? apellido;
                    const alumnoId = await editarAlumno(alumno[0], nuevoNombre, nuevoApellido);

                    if (alumnoId) {
                        const nuevosAlumnos = alumnos.map(a => a[0] === alumnoId ? [a[0], nuevoNombre, nuevoApellido] : a);
                        setAlumnos(nuevosAlumnos);
                        setEditingAlumnoId(null);
                        setEditedAlumnoValues({});
                    }
                }} style={styles.buttonEditar}>
                    <Text style={styles.buttonTextEditar}>Guardar Cambios</Text>
                </TouchableOpacity>
            ) : (
                <View style={styles.icons} key={`acciones-${alumno[0]}`}>
                    <TouchableOpacity onPress={() => setEditingAlumnoId(alumno[0])} style={styles.editar}>
                        <Feather name="edit" size={24} color="white" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={async () => {
                        const alumnoId = await eliminarAlumno(alumno[0]);
                        if (alumnoId) {
                            setAlumnos(alumnos.filter(a => a[0] !== alumnoId));
                        }
                    }} style={styles.eliminar}>
                        <Feather name="trash-2" size={24} color="white" />
                    </TouchableOpacity>
                </View>
            ),
        ];
    });


    return (
        <ScrollView style={{ paddingLeft: 20, paddingRight: 20, marginBottom: 20 }}>
            <View style={styles.container_general}>
                <Text style={styles.text}>{curso[1]}</Text>
                <View style={styles.container}>
                    <TouchableOpacity onPress={onPress} style={styles.button}>
                        <AntDesign name="plussquareo" size={24} color="white" />
                        <Text style={styles.buttonText}>Agregar Alumno</Text>
                    </TouchableOpacity>
                    <ModalAlumnos
                        curso={curso}
                        visible={showModal}
                        onClose={() => setShowModal(false)}
                        onAlumnoAdded={handleAlumnoAdded} />
                </View>
            </View>
            <Table borderStyle={{ borderWidth: 1, borderColor: '#ccc' }}>
                <Row data={tableHead} style={styles.head} textStyle={styles.tableText} />
                <Rows data={tableData} textStyle={styles.tableText} />
            </Table>
        </ScrollView>
    );
};

export default DetalleCurso;
