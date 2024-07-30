import { StyleSheet } from 'react-native';
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingLeft: 20, 
        paddingRight: 20, 
        marginBottom: 20
    },
    buttonContainer: {
        width: '100%',
        marginTop: 80,
        marginBottom: 0,
    },
    instructionsContainer: {
        padding: 20,
        borderWidth: 2,
        borderColor: '#1e90ff',
        borderRadius: 10,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    text: {
        fontSize: 16,
        marginBottom: 5,
    },
    button: {
        backgroundColor: '#1e90ff',
        padding: 10,
        borderRadius: 5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 10, // Añadir margen para separar el texto del icono
    },
});

export default styles;
