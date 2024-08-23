import React from 'react';
import { ActivityIndicator, Text, View, StyleSheet } from 'react-native';


const Cargando = () => {
    return (
        <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#1e90ff" />
            <Text style={styles.loadingText}>Cargando...</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    loadingText: {
        fontSize: 18,
        color: '#fff',
    }
})
export default Cargando;
