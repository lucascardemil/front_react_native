import React, { useState } from 'react';
import { Modal, Text, Pressable, View, TextInput } from 'react-native';
import styles from '../styles/style_modal_pruebas';
import AgregarPrueba from '../services/pruebas/services_agregar_prueba';

const ModalPruebas = ({ visible, onClose, preguntas, alternativas, respuestas, onPruebaAdded }) => {
    const usuario_id = 1;
    const [asignatura, setAsignatura] = useState('');

    const hideConfirmModal = () => {
        onClose();
    };

    return (

        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={hideConfirmModal}>
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Text style={styles.modalText}>Ingrese el nombre de la Asignatura:</Text>
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
                                const response = await AgregarPrueba(usuario_id, preguntas, alternativas, respuestas, asignatura);
                                if (response.status === true) {

                                    const nuevaPrueba = [
                                        response.hojas_respuestas.alternativas,
                                        response.hojas_respuestas.asignatura,
                                        response.hojas_respuestas.preguntas,
                                        response.hojas_respuestas.respuestas,
                                        response.hojas_respuestas.usuario_id
                                    ];
                                    onPruebaAdded(nuevaPrueba);
                                    setAsignatura('');
                                    onClose();
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

export default ModalPruebas;