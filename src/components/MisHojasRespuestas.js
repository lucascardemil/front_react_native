import React, { useState, useEffect } from 'react';
import { Text, View, Modal, TouchableOpacity, Pressable } from 'react-native';
import obtenerHojasRespuestas from '../services/pruebas/services_pruebas';
import eliminarHojasRespuestas from '../services/pruebas/services_eliminar_prueba';
import { Feather } from '@expo/vector-icons';
import styles from '../styles/style_hojas_respuestas';

const MisHojas = ({ nueva_prueba }) => {
    const user_id = 1;
    const [hojasRespuestas, setHojasRespuestas] = useState([]);
    const [hojaAEliminar, setHojasRespuestasAEliminar] = useState(null);
    const [confirmDeleteModalVisible, setConfirmDeleteModalVisible] = useState(false);
    const nuevaPrueba = nueva_prueba;

    useEffect(() => {
        const fetchHojasRespuestas = async () => {
            const data_hojasrespuestas = await obtenerHojasRespuestas(user_id);
            setHojasRespuestas(data_hojasrespuestas);
        };
        fetchHojasRespuestas();

        if (nuevaPrueba) {
			setHojasRespuestas((prevMisHojas) => [...prevMisHojas, nuevaPrueba]);
		}
    }, [user_id, nuevaPrueba]);

    const showConfirmDeleteModal = (curso) => {
		setHojasRespuestasAEliminar(curso);
		setConfirmDeleteModalVisible(true);
	};

	const hideConfirmDeleteModal = () => {
		setHojasRespuestasAEliminar(null);
		setConfirmDeleteModalVisible(false);
	};
    return (
        <View>
            {hojasRespuestas ? (
                hojasRespuestas.map((hoja, index) => (
                    <View key={index} style={styles.create}>
                        <View style={styles.rowContainer}>
                            <Text style={styles.text}>{hoja[1]}</Text>
                            <View style={styles.rowContainerButton}>
                                {/* <TouchableOpacity style={styles.editar} onPress={() => verDetalleCurso(hoja)}>
                                    <Feather name="edit" size={24} color="white" />
                                </TouchableOpacity> */}
                                <TouchableOpacity style={styles.eliminar} onPress={() => showConfirmDeleteModal(hoja)}>
                                    <Feather name="trash-2" size={24} color="white" />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                ))
            ) : (
                <Text>No hay hojas de respuestas disponibles.</Text>
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
                                ¿Seguro que desea borrar la hoja de respuesta "{hojaAEliminar[1]}"?
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
                                        setHojasRespuestas((prevHojas) => prevHojas.filter((hoja) => hoja[0] !== hojaAEliminar[0]));
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

export default MisHojas;