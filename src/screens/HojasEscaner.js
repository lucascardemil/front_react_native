import React, { useState, useEffect } from 'react';
import { Alert, Text, View, TouchableOpacity } from 'react-native';
import styles from '../styles/style_hojas_escaner';
import obtenerHojasRespuestas from '../services/pruebas/services_pruebas';
import { AntDesign } from '@expo/vector-icons';

const HojasScanner = ({ route, navigation }) => {
    const user_id = 1;
    const [hojasRespuestas, setHojasRespuestas] = useState([]);
    const { data_alumno } = route.params;

    useEffect(() => {
        const fetchHojasRespuestas = async () => {
            const data_HojasRespuestas = await obtenerHojasRespuestas(user_id);
            setHojasRespuestas(data_HojasRespuestas);
            console.log(data_HojasRespuestas)
        };
        fetchHojasRespuestas();
        
    }, [user_id]);

    const onSelectHoja = (hoja) => {
        if (navigation) {
            navigation.navigate('Gestion de prueba', { id: hoja[0], alternativas: hoja[2], preguntas: hoja[3], respuestas: hoja[4], data_alumno });
        } else {
            console.error("Navigation prop is undefined.");
        }
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

export default HojasScanner;
