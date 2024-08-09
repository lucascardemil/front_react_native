import React from 'react';
import { View, Image, StyleSheet, Alert, ScrollView } from 'react-native';
import ImagePickerComponent from '../components/ImagePickerComponent';
import CameraComponent from '../components/CameraComponent';
import { AntDesign } from '@expo/vector-icons';


const GestionImagen = ({ route }) => {
    const { id, alternativas, preguntas, respuestas, data_alumno, imagen } = route.params;

    const preguntasImagen = JSON.parse(preguntas)
    const respuestasImagen = JSON.parse(respuestas)

    const ANSWER_KEY = {};
    preguntasImagen.forEach((pregunta, index) => {
        ANSWER_KEY[pregunta.toString()] = respuestasImagen[index].toString();
    });


    return (
        <ScrollView style={styles.container}>
            <View style={styles.buttonContainer}>
                <CameraComponent data_alumno={data_alumno} alternativas={alternativas} ANSWER_KEY={ANSWER_KEY} id={id} preguntas={preguntas} respuestas={respuestas}/>
                <ImagePickerComponent data_alumno={data_alumno} alternativas={alternativas} ANSWER_KEY={ANSWER_KEY} id={id} preguntas={preguntas} respuestas={respuestas}/>
            </View>
            <View style={styles.imageDefaultContainer}>
                {imagen !== '' ? (
                    <Image
                        source={{ uri: imagen }}
                        style={styles.image}
                        resizeMode="contain"
                        onError={() => Alert.alert('Error al cargar la imagen')}
                        onLoad={() => Alert.alert('Imagen cargada correctamente')}
                    />
                ) : (
                    <AntDesign name="filetext1" size={150} color="white" />
                )}
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingLeft: 20, 
        paddingRight: 20,
    },
    buttonContainer: {
        width: '100%',
        marginTop: 20,
        marginBottom: 0,
    },
    textButton: {
        color: '#ffffff',
        fontSize: 16,
        marginLeft: 5,
        fontWeight: 'bold'
    },
    button: {
        backgroundColor: '#1e90ff',
        padding: 10,
        borderRadius: 5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    imageDefaultContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 20,
        width: '100%',
        height: 1000,
        borderWidth: 1,
        borderColor: '#ddd',
        backgroundColor: '#ddd',
        borderRadius: 5,
        overflow: 'hidden',
    },
    image: {
        width: '100%',
        height: '100%',
    },
});

export default GestionImagen;
