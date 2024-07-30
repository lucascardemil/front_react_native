import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Button, Alert } from 'react-native';
import ModalPruebas from '../components/ModalPrueba';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const Alternativa = ({ indice, onPress, isSelected }) => (
    <TouchableOpacity onPress={onPress}>
        <View style={[styles.alternativa, isSelected && styles.selectedAlternativa]}>
            <Text>{indice + 1}</Text>
        </View>
    </TouchableOpacity>
);

const GenerarFormulario = ({ preguntas, alternativas }) => {
    const [respuestas, setRespuestas] = useState(Array(preguntas).fill(null));
    const [showModal, setShowModal] = useState(false);
    const navigation = useNavigation();

    const handleRespuestaChange = (index, value) => {
        const nuevasRespuestas = [...respuestas];
        nuevasRespuestas[index] = value;
        setRespuestas(nuevasRespuestas);
    };

    const handleSubirPrueba = () => {
        const preguntasSinResponder = respuestas.reduce((sinResponder, respuesta, index) => {
            if (respuesta === null) {
                sinResponder.push(index + 1);
            }
            return sinResponder;
        }, []);

        if (preguntasSinResponder.length === 0) {
            setShowModal(true);
        } else {
            const preguntasSinResponderString = preguntasSinResponder.join(', ');
            Alert.alert('Error', `Debes contestar la(s) pregunta(s) ${preguntasSinResponderString} antes de subir la prueba`);
        }
    };

    const handlePruebaAdded = (nuevaPrueba) => {
        navigation.navigate('Mis Pruebas', {'prueba': nuevaPrueba});
    };

    return (
        <ScrollView>
            <View style={styles.container}>
                {[...Array(preguntas).keys()].map((index) => (
                    <View key={index} style={styles.preguntaContainer}>
                        <Text>Pregunta {index + 1}:</Text>
                        <View style={styles.alternativasContainer}>
                            {[...Array(alternativas).keys()].map((value) => (
                                <Alternativa
                                    key={value}
                                    indice={value}
                                    onPress={() => handleRespuestaChange(index, value)}
                                    isSelected={respuestas[index] === value}
                                />
                            ))}
                        </View>
                    </View>
                ))}

                <TouchableOpacity style={styles.button} onPress={handleSubirPrueba}>
                    <AntDesign name="plussquareo" size={24} color="white" />
                    <Text style={styles.buttonText}>Subir Prueba</Text>
                </TouchableOpacity>

                <ModalPruebas
                    visible={showModal}
                    respuestas={respuestas}
                    preguntas={preguntas}
                    alternativas={alternativas}
                    onClose={() => setShowModal(false)}
                    onPruebaAdded={handlePruebaAdded} />
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        justifyContent: 'center',
    },
    preguntaContainer: {
        marginBottom: 20,
    },
    alternativasContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 8,
    },
    alternativa: {
        backgroundColor: '#1e90ff',
        padding: 10,
        textAlign: 'center',
        alignContent: 'center',
        alignItems: 'center',
        width: 40,
        borderRadius: 100,
        borderWidth: 2,
        borderColor: 'blue',
        marginRight: 8,
    },
    selectedAlternativa: {
        backgroundColor: 'blue',
        borderColor: 'white',
    },
    button: {
        width:'100%',
        backgroundColor: '#1e90ff',
        padding: 10,
        borderRadius: 5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 10,
    }
});

export default GenerarFormulario;
