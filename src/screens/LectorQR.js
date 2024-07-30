import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import PasosModal from '../components/Modal';

const QRScannerScreen = ({ navigation }) => {
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const getBarCodeScannerPermissions = async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        };

        getBarCodeScannerPermissions();
    }, []);

    const handleBarCodeScanned = ({ type, data }) => {
        setScanned(true);
        setShowModal(false);
        try {
            const data_alumno = JSON.parse(
                data
                    .replace(/(\w+):/g, '"$1":')  // Agrega comillas dobles a las claves
                    .replace(/'([^']*)'/g, '"$1"') // Reemplaza comillas simples con dobles
            );

            navigation.navigate('Asignaturas', { data_alumno: data_alumno });
        } catch (error) {
            alert(`Error parsing JSON: ${error}`);
        }
    };


    if (hasPermission === null) {
        return <Text>Requesting for camera permission</Text>;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }

    return (
        <View style={styles.container}>
            <BarCodeScanner
                onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                style={StyleSheet.absoluteFillObject}
            />
            <PasosModal visible={showModal} onClose={() => setShowModal(false)} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 0,
        padding: 0
    },

});

export default QRScannerScreen;
