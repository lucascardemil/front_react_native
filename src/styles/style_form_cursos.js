import { StyleSheet } from 'react-native';
const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        paddingLeft: 20, 
        paddingRight: 20, 
        marginBottom: 20
    },
    input: {
        width:'100%',
        height: 45,
        padding: 10,
        backgroundColor: '#FFFFFF',
        borderColor: '#B4B4B4', // Color del borde
        borderWidth: 1,        // Ancho del borde
        borderRadius: 5,
        fontSize: 16,
        marginBottom: 20
    },
    button: {
        width:'100%',
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
        marginLeft: 10,
    }
});

export default styles;