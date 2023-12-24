import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './src/screens/HomeScreen';
import Navbar from './src/components/Navbar';  
import QRScannerScreen from './src/screens/LectorQR';
import CameraComponent from './src/components/CameraComponent';
import GeneratePrueba from './src/screens/GeneratePrueba';
import MisPruebas from './src/screens/MisPruebas';
import MisCursos from './src/screens/cursos'
import DetalleCurso from './src/screens/alunosPorCurso';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Navbar/>
      <Stack.Navigator initialRouteName="Inicio">
        <Stack.Screen name="Inicio" component={HomeScreen}/>
        <Stack.Screen name="Scanner QR" component={QRScannerScreen} />
        <Stack.Screen name="Scanner" component={CameraComponent} />
        <Stack.Screen name="Prueba" component={GeneratePrueba} />
        <Stack.Screen name="Mis Pruebas" component={MisPruebas} />
        <Stack.Screen name="Mis Cursos" component={MisCursos} />
        <Stack.Screen name="DetalleCurso" component={DetalleCurso} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
