import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './src/screens/HomeScreen';
import Navbar from './src/components/Navbar';
import QRScannerScreen from './src/screens/LectorQR';
import CameraComponent from './src/components/CameraComponent';
import GeneratePrueba from './src/screens/GeneratePrueba';
import MisPruebas from './src/screens/MisPruebas';
import MisCursos from './src/screens/Cursos';
import DetalleCurso from './src/screens/DetalleCurso';
import CrearCursoFormulario from './src/screens/FormCursos';
import GestionImagen from './src/screens/GestionImagen';
import HojasEscaner from './src/screens/HojasEscaner';

const Stack = createStackNavigator();

const navigationOptions = {
    headerStyle: {
        backgroundColor: '#1e90ff',
    },
    headerTintColor: 'white',
};

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Inicio">
                <Stack.Screen
                    name="Inicio"
                    component={HomeScreen}
                    options={navigationOptions}
                />
                <Stack.Screen
                    name="Escanear Alumno"
                    component={QRScannerScreen}
                    options={navigationOptions}
                />
                <Stack.Screen
                    name="Scanner"
                    component={CameraComponent}
                    options={navigationOptions}
                />
                <Stack.Screen
                    name="Crear Prueba"
                    component={GeneratePrueba}
                    options={navigationOptions}
                />
                <Stack.Screen
                    name="Mis Pruebas"
                    component={MisPruebas}
                    options={navigationOptions}
                />
                <Stack.Screen
                    name="Mis Cursos"
                    component={MisCursos}
                    options={navigationOptions}
                />
                <Stack.Screen
                    name="Detalle Curso"
                    component={DetalleCurso}
                    options={navigationOptions}
                />
                <Stack.Screen
                    name="Crear Cursos"
                    component={CrearCursoFormulario}
                    options={navigationOptions}
                />
                <Stack.Screen
                    name="Gestion de prueba"
                    component={GestionImagen}
                    options={navigationOptions}
                />
                <Stack.Screen
                    name="Asignaturas"
                    component={HojasEscaner}
                    options={navigationOptions}
                />

            </Stack.Navigator>
            <Navbar />
        </NavigationContainer>
    );
}
