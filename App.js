import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './src/screens/HomeScreen';
// import Navbar from './components/Navbar';  

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      {/* <Navbar/> */}
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Inicio" component={HomeScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
