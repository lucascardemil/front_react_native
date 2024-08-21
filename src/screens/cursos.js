import React, { useState, useEffect } from 'react';
import { Text, View, ScrollView, TouchableOpacity, Modal, Pressable } from 'react-native';
import styles from '../styles/style_cursos';
import CrearCurso from '../components/GenerarCurso';
import obtenerCursosPorUser from '../services/cursos/services_cursos_id_user';
import eliminarAlumnosYCurso from '../services/cursos/services_eliminar_alumnos_cursos';


const MisCursos = ({ navigation, route }) => {
	const user_id = 1;
	const [cursos, setCursos] = useState([]);
	const [cursoAEliminar, setCursoAEliminar] = useState(null);
	const [confirmDeleteModalVisible, setConfirmDeleteModalVisible] = useState(false);
	const nuevoCurso = route.params?.nuevoCurso;

	useEffect(() => {
		const fetchAsignatura = async () => {
			const data_cursos = await obtenerCursosPorUser(user_id);
			setCursos(data_cursos);
		};
		fetchAsignatura();

		if (nuevoCurso) {
			setCursos((prevCursos) => [...prevCursos, nuevoCurso]);
		}

	}, [user_id, nuevoCurso]);

	const verDetalleCurso = (curso) => {
		navigation.navigate('Detalle Curso', { curso });
	};

	const showConfirmDeleteModal = (curso) => {
		setCursoAEliminar(curso);
		setConfirmDeleteModalVisible(true);
	};

	const hideConfirmDeleteModal = () => {
		setCursoAEliminar(null);
		setConfirmDeleteModalVisible(false);
	};

	return (
		<ScrollView style={{ paddingLeft: 20, paddingRight: 20, marginBottom: 20 }}>
			<View style={styles.container}>
				<CrearCurso />
				{cursos ? (
					cursos.map((curso, index) => (
						<View key={index} style={styles.create}>
							<View>
								<Text style={styles.text}>{curso[1]}</Text>
								<View>
									<TouchableOpacity style={styles.editar} onPress={() => verDetalleCurso(curso)}>
										<Text style={styles.colorTextIcon}>Editar Curso</Text>
									</TouchableOpacity>
									<TouchableOpacity style={styles.eliminar} onPress={() => showConfirmDeleteModal(curso)}>
										<Text style={styles.colorTextIcon}>Eliminar Curso</Text>
									</TouchableOpacity>
								</View>
							</View>
						</View>
					))
				) : (
					<Text>No hay cursos disponibles.</Text>
				)}



				<Modal
					animationType="slide"
					transparent={true}
					visible={confirmDeleteModalVisible}
					onRequestClose={hideConfirmDeleteModal}>
					<View style={styles.centeredView}>
						<View style={styles.modalView}>
							{cursoAEliminar && (
								<Text style={styles.modalText}>
									¿Seguro que desea borrar el curso "{cursoAEliminar[1]}"?
								</Text>
							)}
							<View style={{ flexDirection: 'row', justifyContent: 'space-around', width: '100%' }}>
								<Pressable
									style={[styles.buttonbg]}
									onPress={hideConfirmDeleteModal}>
									<Text style={styles.textStyle}>Cancelar</Text>
								</Pressable>
								<Pressable
									style={[styles.buttonbg, styles.eliminar]}
									onPress={async () => {
										hideConfirmDeleteModal();
										const response = await eliminarAlumnosYCurso(cursoAEliminar[0]);
										if (response) {
											setCursos((prevCursos) => prevCursos.filter((curso) => curso[0] !== cursoAEliminar[0]));
										}
									}}>
									<Text style={styles.textStyle}>Eliminar</Text>
								</Pressable>
							</View>
						</View>
					</View>
				</Modal>

			</View>
		</ScrollView>
	);
};

export default MisCursos;