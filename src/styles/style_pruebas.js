import { StyleSheet } from 'react-native';
const styles = StyleSheet.create({
	container: {
		marginTop: 20,
        marginBottom: 20
	},
	create: {
		width: '100%',
		padding: 10,
		marginBottom: 20,
		borderRadius: 5,
		borderWidth: 2,
		borderColor: '#1e90ff'
	},
	text: {
		color: '#343a40',
		fontSize: 20,
		marginLeft: 10,
		fontWeight: 'bold'
	},
	editar: {
		backgroundColor: '#ffc107',
		padding: 5,
		borderRadius: 5,
		marginRight: 5
	},
	eliminar: {
		backgroundColor: '#dc3545',
		padding: 5,
		borderRadius: 5
	},
	rowContainerButton: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	rowContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		margin: 10,
	},
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
	buttonbg: {
		width: 100,
		backgroundColor: '#1e90ff',
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
		fontSize: 16,
		fontWeight: 'bold',
		marginBottom: 20,
		textAlign: 'center',
	},
    button: {
        width: '100%',
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