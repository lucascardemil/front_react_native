import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default CrearCurso = () => {
  const navigation = useNavigation();

  const onPressPrueba = () => {
    if (navigation) {
      navigation.navigate('Crear Cursos');
    } else {
      console.error('Error: navigation is undefined');
    }
  };

  return (
    <TouchableOpacity onPress={onPressPrueba}>
      <View style={styles.create}>
        <Text style={styles.text}>
          Crear Nuevo Curso +
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  create: {
    width: 310,
    height: 85,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: '#1e90ff',
    marginBottom: 20,
    textAlign: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 30,
    margin: 6
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 4
  },
  scrollViewContainer: {
    padding: 50,
  },
});
