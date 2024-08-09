import React, { useState, useEffect } from 'react';
import { Alert, Text, View, StyleSheet } from 'react-native';
import { CameraView, Camera } from "expo-camera";
import PasosModal from '../components/Modal';

const QRScannerScreen = ({ navigation }) => {
    const [showModal, setShowModal] = useState(false);

    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);

    useEffect(() => {
        const getCameraPermissions = async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            setHasPermission(status === "granted");
        };

        getCameraPermissions();
    }, []);


    const handleBarCodeScanned = ({ type, data }) => {
        setScanned(true);
        setShowModal(false);
        try {
            const correctedData = data.replace(/'/g, '"');
            const parsedData = JSON.parse(correctedData);
            navigation.navigate('Asignaturas', { data_alumno: parsedData });
        } catch (error) {
            Alert.alert(`Error parsing JSON: ${error}`);
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
            <CameraView
                onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
                barcodeScannerSettings={{
                    barcodeTypes: ["qr", "pdf417"],
                }}
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
