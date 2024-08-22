import React, { useState, useEffect } from 'react';
import { Modal, Text, Pressable, View, TextInput,Alert } from 'react-native';
import styles from '../styles/style_modal_pruebas';
import AgregarPrueba from '../services/pruebas/services_agregar_prueba';
import obtenerCursosPorUser from '../services/cursos/services_cursos_id_user';
import { Picker } from '@react-native-picker/picker';

const ModalHojaDeRespuesta = ({ visible, onClose, preguntas, alternativas, respuestas, onPruebaAdded }) => {
    const user_id = 1;
    const [asignatura, setAsignatura] = useState('');
    const [selectedCurso, setSelectedCurso] = useState();
    const [cursos, setCursos] = useState([]);

    const hideConfirmModal = () => {
        onClose();
    };

    useEffect(() => {
        const fetchCursos = async () => {
            const data_cursos = await obtenerCursosPorUser(user_id);
            setCursos(data_cursos);
        };
        fetchCursos();
    }, [user_id]);

    return (

        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={hideConfirmModal}>
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <View style={styles.piker}>
                        <Picker
                            selectedValue={selectedCurso}
                            onValueChange={(itemValue) => setSelectedCurso(itemValue)}>

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
                    <TextInput
                        style={styles.input}
                        placeholder="Ingrese la Asignatura"
                        value={asignatura}
                        onChangeText={(text) => setAsignatura(text)}
                    />
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: 300 }}>
                        <Pressable
                            style={[styles.buttonClose]}
                            onPress={hideConfirmModal}>
                            <Text style={styles.textStyle}>Cancelar</Text>
                        </Pressable>
                        <Pressable
                            style={[styles.button]}
                            onPress={async () => {
                                try {
                                    const response = await AgregarPrueba(preguntas, alternativas, respuestas, asignatura, selectedCurso);
                                    if (response.status === true && response.asignaturas) {
                                        onPruebaAdded();
                                        setAsignatura('');
                                        onClose();
                                    } else {
                                        Alert.alert('Error', 'No se pudo crear la hoja de respuesta');
                                    }
                                } catch (error) {
                                    Alert.alert('Error', 'Error con el servicios de crear la prueba');
                                }
                            }}>
                            <Text style={styles.textStyle}>Guardar</Text>
                        </Pressable>
                    </View>
                </View>
            </View>
        </Modal>

    );
};

export default ModalHojaDeRespuesta;