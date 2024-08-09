import React, { useRef, useState, useEffect } from 'react';
import { ScrollView, Text, View, TouchableOpacity, TextInput, Button, Alert } from 'react-native';
import { Table, Row, Rows } from 'react-native-table-component';
import styles from '../styles/style_detalle_curso';
import { AntDesign, Feather } from '@expo/vector-icons';
import ModalAlumnos from '../components/ModalAlumnos';
import obtenerAlumnosPorCurso from '../services/alumnos/services_alumnos_curso';
import eliminarAlumno from '../services/alumnos/services_eliminar_alumno';
import editarAlumno from '../services/alumnos/services_editar_alumno';
import QRCode from 'react-native-qrcode-svg';
import ViewShot from "react-native-view-shot";
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';

const DetalleCurso = ({ route }) => {
    const { curso } = route.params;
    const [alumnos, setAlumnos] = useState([]);
    const [editingAlumnoId, setEditingAlumnoId] = useState(null);
    const [editedAlumnoValues, setEditedAlumnoValues] = useState({});
    const [showModal, setShowModal] = useState(false);
    const viewShotRef = useRef(null);
    const [alumnoString, setAlumnoString] = useState('');

    const onPress = () => {
        setShowModal(true);
    };

    const handleEditChange = (field, value) => {
        setEditedAlumnoValues((prevValues) => ({
            ...prevValues,
            [field]: value,
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

    const verQrAlumno = (alumno) => {
        setAlumnoString(JSON.stringify(alumno));
    };

    const downloadQR = async () => {
        try {
            if (viewShotRef.current && alumnoString) {
                // Captura el contenido de ViewShot como PNG
                const uri = await viewShotRef.current.capture();

                const fileUri = FileSystem.documentDirectory + 'codigo_qr.png';
                await FileSystem.moveAsync({
                    from: uri,
                    to: fileUri
                });

                Alert.alert('Éxito', `Código QR guardado en: ${fileUri}`);

                // Compartir el archivo si el dispositivo lo permite
                if (await Sharing.isAvailableAsync()) {
                    await Sharing.shareAsync(fileUri);
                } else {
                    console.log('Compartir no disponible en este dispositivo');
                }
            } else {
                Alert.alert('Error', 'No hay datos para generar el código QR.');
            }
        } catch (error) {
            console.error('Error al guardar el código QR:', error);
            Alert.alert('Error', `No se pudo guardar el código QR: ${error.message}`);
        }
    }


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
                    <TouchableOpacity onPress={() => verQrAlumno(alumno)} style={styles.descarga}>
                        <Feather name="download" size={24} color="white" />
                    </TouchableOpacity>
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

            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 20, marginBottom: 20 }}>
                {alumnoString ? (
                    <ViewShot ref={viewShotRef} options={{ format: 'png', quality: 0.9 }}>
                        <QRCode
                            value={alumnoString}
                            size={300}
                        />
                        <Button style={{ marginTop: 20, marginBottom: 20 }} title="Descargar Código QR" onPress={downloadQR} />
                    </ViewShot>
                ): ''}
            </View>
            
        </ScrollView>
    );
};

export default DetalleCurso;
