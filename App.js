import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import Navbar from './components/Navbar';  // Asegúrate de que la ruta al componente Navbar es correcta

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Navbar/>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Inicio" component={HomeScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
