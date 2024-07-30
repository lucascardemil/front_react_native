import { StyleSheet } from 'react-native';
const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 22,
    },
    modalView: {
        margin: 20,
		backgroundColor: 'white',
		borderRadius: 20,// Add black border
		padding: 35,
		alignItems: 'center',
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 5,
    },
    button: {
        backgroundColor: '#0780F8',
        padding: 10,
        borderRadius: 5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonClose: {
        backgroundColor: '#dc3545',
        padding: 10,
        borderRadius: 5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 10,
        fontSize: 18,
        fontWeight: 'bold'
    },
    input: {
        width: 300,
        height: 45,
        padding: 10,
        backgroundColor: '#FFFFFF',
        borderColor: '#B4B4B4', // Color del borde
        borderWidth: 1,        // Ancho del borde
        borderRadius: 5,
        fontSize: 18,
        marginBottom: 20
    },
});

export default styles;