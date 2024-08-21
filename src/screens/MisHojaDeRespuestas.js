import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import styles from '../styles/style_pruebas';
import VerAsignaturas from '../components/VerAsignaturas'

const MisHojaDeRespuestas = ({ navigation, route }) => {
    const nueva_prueba = route.params === undefined ? [] : route.params.nueva_prueba;

    const onPressPrueba = () => {
        navigation.navigate('Crear Hoja De Respuesta');
    };

    return (
        <ScrollView style={{ paddingLeft: 20, paddingRight: 20, marginBottom: 20}}>
            <View style={styles.container}>
                <TouchableOpacity style={styles.button} onPress={onPressPrueba}>
                    <AntDesign name="plussquareo" size={24} color="white" />
                    <Text style={styles.buttonText}>Nueva Hoja De Respuesta</Text>
                </TouchableOpacity>
            </View>
            <VerAsignaturas navigation={navigation}/>
        </ScrollView>
    );
};

export default MisHojaDeRespuestas;
