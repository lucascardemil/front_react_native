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
    editar: {
		backgroundColor: '#ffc107',
		padding: 10,
		borderRadius: 5
	},
    eliminar: {
		backgroundColor: '#dc3545',
		padding: 10,
		borderRadius: 5
	},
    descarga: {
		backgroundColor: '#28a745',
		padding: 10,
		borderRadius: 5
	},
    colorTextIcon:{
        fontWeight: 'bold',
        textAlign:'center',
        color: 'white'
    }

});

export default styles;