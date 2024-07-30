import { StyleSheet } from 'react-native';
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
        color: '#343a40',
        fontSize: 20,
        marginLeft: 10,
        fontWeight: 'bold'
    },
    rowContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: 4,
    },
    seleccionar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#1e90ff',
        padding: 5,
        borderRadius: 5,
        marginRight: 5
    },
    textButton: {
        color: '#ffffff',
        fontSize: 16,
        marginLeft: 5,
        fontWeight: 'bold'
    },
});

export default styles;