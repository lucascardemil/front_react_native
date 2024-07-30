import { StyleSheet } from 'react-native';
const styles = StyleSheet.create({
    container_general: {
        display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 20,
    },
    text: {
        margin: 20,
        fontSize: 45,
        marginBottom: 40,
        fontWeight: 'bold'
    },
    container: {
        width: '100%',
        height: 45,
        alignItems: 'flex-end',
        marginBottom: 20
    },
    icons: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginRight: 16
    },

    tableText: {
        fontSize: 18,
        padding: 10,
        fontWeight: 'bold',
    },
    head: {
        backgroundColor: '#1e90ff'
    },
    
    button: {
        width: '100%',
        backgroundColor: '#0780F8',
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
    },
    buttonEditar: {
        backgroundColor: '#ffc107',
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonTextEditar: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 10,
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

});

export default styles;