import React, { useState, useEffect } from 'react';
import { Alert, Text, View, TouchableOpacity } from 'react-native';
import styles from '../styles/style_hojas_escaner';
import obtenerAsignaturas from '../services/pruebas/services_asignaturas';
import { AntDesign } from '@expo/vector-icons';

const HojasEscaner = ({ route, navigation }) => {
    const [hojasRespuestas, setHojasRespuestas] = useState([]);
    const { data_alumno } = route.params;

    useEffect(() => {
        const fetchHojasRespuestas = async () => {
            const data_HojasRespuestas = await obtenerAsignaturas(data_alumno[3]);
            setHojasRespuestas(data_HojasRespuestas);
        };
        fetchHojasRespuestas();

    }, [data_alumno]);

    const onSelectHoja = (hoja) => {
        navigation.navigate('Gestion de prueba', { id: hoja[0], alternativas: hoja[2], preguntas: hoja[3], respuestas: hoja[4], data_alumno });
    };


    return (
        <View style={styles.container}>
            {hojasRespuestas ? (
                hojasRespuestas.map((hoja, index) => (
                    <View key={index} style={styles.create}>
                        <View style={styles.rowContainer}>
                            <Text style={styles.text}>{hoja[1]}</Text>

                            <View style={styles.rowContainer}>
                                <TouchableOpacity style={styles.seleccionar} onPress={() => onSelectHoja(hoja)}>
                                    <AntDesign name="select1" size={24} color="white" />
                                    <Text style={styles.textButton}>Seleccionar</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                ))
            ) : (
                <Text>No hay hojas de respuestas disponibles.</Text>
            )}
        </View>
    );
};

export default HojasEscaner;
