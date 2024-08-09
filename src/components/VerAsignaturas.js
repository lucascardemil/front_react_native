import React, { useState, useEffect } from 'react';
import { Text, View, Modal, TouchableOpacity, Pressable } from 'react-native';
import obtenerAsignaturas from '../services/pruebas/services_asignaturas';
import obtenerCursosPorUser from '../services/cursos/services_cursos_id_user';
import eliminarHojasRespuestas from '../services/pruebas/services_eliminar_prueba';
import obtenerPruebas from '../services/pruebas/services_pruebas';
import { Feather } from '@expo/vector-icons';
import styles from '../styles/style_asignaturas';
import { Picker } from '@react-native-picker/picker';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';

const VerAsignaturas = ({ nueva_prueba }) => {
    const user_id = 1;
    const [asignaturas, setAsignaturas] = useState([]);
    const [hojaAEliminar, setHojasRespuestasAEliminar] = useState(null);
    const [confirmDeleteModalVisible, setConfirmDeleteModalVisible] = useState(false);
    const nuevaPrueba = nueva_prueba;

    const [cursos, setCursos] = useState([]);

    useEffect(() => {
        const fetchCursos = async () => {
            const data_cursos = await obtenerCursosPorUser(user_id);
            setCursos(data_cursos);
        };
        fetchCursos();
    }, [user_id]);

    useEffect(() => {
        if (nuevaPrueba.length > 0) {
            setAsignaturas((prevMisHojas) => [...prevMisHojas, nuevaPrueba]);
        }
    }, [nuevaPrueba]);

    const showConfirmDeleteModal = (curso) => {
        setHojasRespuestasAEliminar(curso);
        setConfirmDeleteModalVisible(true);
    };

    const hideConfirmDeleteModal = () => {
        setHojasRespuestasAEliminar(null);
        setConfirmDeleteModalVisible(false);
    };

    const downloadAlumnos = (asignatura) => {
        const fetchPruebas = async () => {
            const data_pruebas = await obtenerPruebas(asignatura[0]);
            console.log(data_pruebas)

            // Convertir los datos a formato CSV
            const csvContent = data_pruebas.map(row => `${row.nombre},${row.nota},${row.respuesta}`).join('\n');

            // Obtener la fecha actual
            const today = new Date();
            const day = String(today.getDate()).padStart(2, '0');
            const month = String(today.getMonth() + 1).padStart(2, '0'); // Los meses empiezan desde 0
            const year = today.getFullYear();

            // Formatear la fecha como YYYYMMDD
            const formattedDate = `${year}${month}${day}`;

            // Nombre del archivo con la asignatura y la fecha
            const fileName = `${asignatura[1]}_${formattedDate}.csv`;
            const fileUri = `${FileSystem.documentDirectory}${fileName}`;

            // Guardar el archivo CSV
            await FileSystem.writeAsStringAsync(fileUri, csvContent, {
                encoding: FileSystem.EncodingType.UTF8,
            });

            console.log('Archivo CSV guardado en:', fileUri);

            // Compartir el archivo si el dispositivo lo permite
            if (await Sharing.isAvailableAsync()) {
                await Sharing.shareAsync(fileUri);
            } else {
                console.log('Compartir no disponible en este dispositivo');
            }
        };
        fetchPruebas();
    };

    return (
        <View>
            <View style={styles.piker}>
                <Picker
                    onValueChange={(itemValue) => {
                        const fetchAsignaturas = async () => {
                            const data_asignaturas = await obtenerAsignaturas(itemValue);
                            setAsignaturas(data_asignaturas);
                        };
                        fetchAsignaturas();
                    }}>

                    <Picker.Item key="0" label="Seleccione un curso" value="0" />
                    {cursos ? (
                        cursos.map((curso, index) => (
                            <Picker.Item key={index} label={curso[1]} value={curso[0]} />
                        ))
                    ) : (
                        <Picker.Item label="No hay Cursos" value="0" />
                    )}
                </Picker>
            </View>
            {asignaturas.length > 0 ? (
                asignaturas.map((asignatura, index) => (
                    <View key={index} style={styles.create}>
                        <View style={styles.rowContainer}>
                            <Text style={styles.text}>{asignatura[1]}</Text>
                            <View style={styles.rowContainerButton}>
                                <TouchableOpacity style={styles.descarga} onPress={() => downloadAlumnos(asignatura)}>
                                    <Feather name="download" size={24} color="white" />
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.eliminar} onPress={() => showConfirmDeleteModal(asignatura)}>
                                    <Feather name="trash-2" size={24} color="white" />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                ))
            ) : (
                <Text>No hay asignaturas.</Text>
            )}

            <Modal
                animationType="slide"
                transparent={true}
                visible={confirmDeleteModalVisible}
                onRequestClose={hideConfirmDeleteModal}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        {hojaAEliminar && (
                            <Text style={styles.modalText}>
                                ¿Seguro que desea borrar la asignatura de respuesta "{hojaAEliminar[1]}"?
                            </Text>
                        )}
                        <View style={{ flexDirection: 'row', justifyContent: 'space-around', width: '100%' }}>
                            <Pressable
                                style={[styles.buttonbg]}
                                onPress={hideConfirmDeleteModal}>
                                <Text style={styles.textStyle}>Cancelar</Text>
                            </Pressable>
                            <Pressable
                                style={[styles.buttonbg, styles.eliminar]}
                                onPress={async () => {
                                    hideConfirmDeleteModal();
                                    const response = await eliminarHojasRespuestas(hojaAEliminar[0]);
                                    if (response) {
                                        setAsignaturas((prevHojas) => prevHojas.filter((asignatura) => asignatura[0] !== hojaAEliminar[0]));
                                    }
                                }}>
                                <Text style={styles.textStyle}>Eliminar</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

export default VerAsignaturas;