import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import styles from '../styles/style_pruebas';
import MisHojasRespuestas from '../components/MisHojasRespuestas'

const MisPruebas = ({ navigation, route }) => {
    const nueva_prueba = route.params === undefined ? [] : route.params.prueba;

    const onPressPrueba = () => {
        navigation.navigate('Crear Prueba');
    };

    return (
        <ScrollView style={{ paddingLeft: 20, paddingRight: 20, marginBottom: 20}}>
            <View style={styles.container}>
                <TouchableOpacity style={styles.button} onPress={onPressPrueba}>
                    <AntDesign name="plussquareo" size={24} color="white" />
                    <Text style={styles.buttonText}>Nueva Prueba</Text>
                </TouchableOpacity>
            </View>
            <MisHojasRespuestas navigation={navigation} nueva_prueba={nueva_prueba}/>
        </ScrollView>
    );
};

export default MisPruebas;
