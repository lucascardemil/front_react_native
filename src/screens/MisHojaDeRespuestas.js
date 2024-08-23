import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import styles from '../styles/style_pruebas';
import VerAsignaturas from '../components/VerAsignaturas'

const MisHojaDeRespuestas = ({ navigation }) => {
    const onPressPrueba = () => {
        navigation.navigate('Crear Hoja De Respuesta');
    };

    return (
        <>
            <View style={styles.container}>
                <TouchableOpacity style={styles.button} onPress={onPressPrueba}>
                    <AntDesign name="plussquareo" size={24} color="white" />
                    <Text style={styles.buttonText}>Nueva Hoja De Respuesta</Text>
                </TouchableOpacity>
            </View>
            <VerAsignaturas navigation={navigation} />
        </>
    );
};

export default MisHojaDeRespuestas;
